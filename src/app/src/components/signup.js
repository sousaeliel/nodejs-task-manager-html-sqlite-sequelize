import TaskManager from "../taskManager.js";
import Template from "../templates/signup.js";

class Signup extends TaskManager {
  constructor(body) {
    super();

    this.body = body;
  }

  render() {
    this.body.innerHTML = Template.render();
    this.body.querySelector("[data-name]").focus();

    this.addEventListener();
  }
  
  addEventListener() {
    this.formSubmit();
    this.signinClick();
  }

  formSubmit() {
    const form = this.body.querySelector("form");
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = e.target.querySelector("[data-name]");
      const email = e.target.querySelector("[data-email]");
      const password = e.target.querySelector("[data-password]");
      
      const opts = {
        method: "POST",
        url: `${this.URL}/users`,
        json: true,
        body: {
          name: name.value,
          email: email.value,
          password: password.value
        }
      };

      this.request(opts, (err, resp, data) => {
        if (err || resp.status === 412) {
          this.emit("error", err);
          return;
        }
          
        this.emit("signup", data);
      });
    });
  }

  signinClick() {
    const signin = this.body.querySelector("[data-signin]");
    
    signin.addEventListener("click", (e) => {
      e.preventDefault();

      this.emit("signin");
    });
  }
}

module.exports = Signup;