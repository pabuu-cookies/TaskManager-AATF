function authForm() {
  return {
    isLogin: true,
    email: "",
    password: "",
    name: "",

    async submitLogin() {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.email, password: this.password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Login failed");
      }
    },

    async submitSignup() {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! You can now log in.");
        this.isLogin = true;
      } else {
        alert(data.error || "Signup failed");
      }
    },

    reset() {
      this.email = "";
      this.password = "";
      this.name = "";
    },
  };
}
