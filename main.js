// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaM-C7JjqsDTQzarHCZXZKtGdL9ZVc8eQ",
    authDomain: "login-6505c.firebaseapp.com",
    projectId: "login-6505c",
    storageBucket: "login-6505c.firebasestorage.app",
    messagingSenderId: "650104534833",
    appId: "1:650104534833:web:1f162ade30a33c7f3f6210",
    measurementId: "G-6PTN3MH4T3"
};

firebase.initializeApp(firebaseConfig);

// تسجيل الدخول
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                Swal.fire({
                    title: 'تم تسجيل الدخول بنجاح 🎉',
                    icon: 'success',
                    confirmButtonText: 'استمرار'
                }).then(() => {
                    window.location.href = 'profile2.html';
                });
            } else {
                Swal.fire({
                    title: 'تحقق من بريدك الإلكتروني 📩',
                    text: 'يرجى تأكيد البريد الإلكتروني قبل تسجيل الدخول.',
                    icon: 'warning',
                    confirmButtonText: 'حسناً'
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                title: 'خطأ!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'حسناً'
            });
        });
}

// إنشاء حساب جديد
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value; // اسم المستخدم

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // تحديث اسم المستخدم
            return user.updateProfile({
                displayName: username
            }).then(() => {
                // إرسال بريد التحقق
                return user.sendEmailVerification();
            });
        })
        .then(() => {
            Swal.fire({
                title: 'تم إنشاء الحساب بنجاح! 🎉',
                text: 'تم إرسال رابط التحقق إلى بريدك الإلكتروني، يرجى التحقق منه.',
                icon: 'info',
                confirmButtonText: 'حسناً'
            });
        })
        .catch((error) => {
            Swal.fire({
                title: 'خطأ!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'حسناً'
            });
        });
}

// مراقبة حالة المستخدم
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            // عرض بيانات المستخدم إذا كان البريد مؤكداً
            document.getElementById('user-username').textContent = user.displayName || 'Unknown';
            document.getElementById('user-email').textContent = user.email;
        } else {
            Swal.fire({
                title: 'تحقق من بريدك الإلكتروني 📩',
                text: 'يرجى تأكيد البريد الإلكتروني لاستخدام الحساب.',
                icon: 'warning',
                confirmButtonText: 'حسناً'
            });
            firebase.auth().signOut();
        }
    } else {
        if (window.location.pathname.includes('profile2.html')) {
            window.location.href = 'login.html';
        }
    }
});

// تسجيل الخروج
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        Swal.fire({
            title: 'خطأ!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'حسناً'
        });
    });
}
