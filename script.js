
const usersBox = document.getElementById("users");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addBtn = document.getElementById("addBtn");

let users = [];
const API_URL = "https://jsonplaceholder.typicode.com/users";

// جلب المستخدمين من API
const getUsers = async () => {
  try {
    const res = await fetch(API_URL);
    users = await res.json();
    renderUsers();
  } catch (error) {
    usersBox.innerHTML = "<p class='text-danger'>فشل تحميل البيانات</p>";
  }
};

// عرض المستخدمين
const renderUsers = () => {
  usersBox.innerHTML = "";

  if (users.length === 0) {
    usersBox.innerHTML = "<p class='text-center'>لا يوجد مستخدمون</p>";
    return;
  }

  users.forEach((user, index) => {
    usersBox.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5>${user.name}</h5>
            <p>${user.email}</p>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">
              حذف
            </button>
          </div>
        </div>
      </div>
    `;
  });
};

// إضافة مستخدم (وهمي)
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("من فضلك املأ جميع الحقول");
    return;
  }

  users.unshift({
    name,
    email
  });

  nameInput.value = "";
  emailInput.value = "";

  renderUsers();
});

// حذف مستخدم
window.deleteUser = (index) => {
  users.splice(index, 1);
  renderUsers();
};

addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// تشغيل التطبيق
getUsers();

