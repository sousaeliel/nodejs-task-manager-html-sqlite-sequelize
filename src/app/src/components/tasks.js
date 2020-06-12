import TaskManager from "../taskManager.js";
import Template from "../templates/tasks.js";
import Loading from "../templates/loading.js";

class Tasks extends TaskManager {
  constructor(body) {
    super();

    this.body = body;
  }

  render() {
    this.renderTaskList();
  }

  addEventListener() {
    this.taskDoneCheckbox();
    this.taskRemoveClick();
  }

  renderTaskList(){
    const opts = {
      method: "GET",
      url: `${this.URL}/tasks`,
      json: true,
      headers: {
        authorization: sessionStorage.getItem("token")
      }
    };

    this.body.innerHTML = Loading.render();

    this.request(opts, (err, resp, data) => {
      if (err) {
        this.emit("error", err);
        return;
      }

      this.body.innerHTML = Template.render(data);
      this.addEventListener();
    });
  }

  taskDoneCheckbox() {
    const dones = this.body.querySelectorAll("[data-done]");
  
    for(let i = 0, max = dones.length; i < max; i++) {
      dones[i].addEventListener("click", (e) => {
        e.preventDefault();
  
        const id = e.target.getAttribute("data-task-id");
        const done = e.target.getAttribute("data-task-done");
  
        const opts = {
          method: "PUT",
          url: `${this.URL}/tasks/${id}`,
          headers: {
            authorization: sessionStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            done: !done
          })
        };

        this.request(opts, (err, resp, data) => {
          if (err || resp.status === 412) {
            this.emit("update-error", err);
            return;
          }

          this.emit("update");
        });
      });
    }
  }

  taskRemoveClick() {
    const removes = this.body.querySelectorAll("[data-remove]");
  
    for(let i = 0, max = removes.length; i < max; i++) {
      removes[i].addEventListener("click", (e) => {
        e.preventDefault();
  
        if (!confirm("Deseja excluir esta tarefa?")) {
          return;
        }

        const id = e.target.getAttribute("data-task-id");

        const opts = {
          method: "DELETE",
          url: `${this.URL}/tasks/${id}`,
          headers: {
            authorization: sessionStorage.getItem("token")
          }
        };

        this.request(opts, (err, resp, data) => {
          if (err || resp.status === 412) {
            this.emit("remove-error", err);
            return;
          }

          this.emit("remove");
        });
      });
    }
  }
}

module.exports = Tasks;