import cluster from "cluster";
import os from "os";

const CPUs = os.cpus();

if (!cluster.isMaster) {
    require("./index");
}
else {
    CPUs.forEach(() => cluster.fork());
    cluster.on("listening", worker => console.log("Cluster %d conected", worker.process.pid));
    cluster.on("disconnect", worker => console.log("Cluster %d disconnected", worker.process.pid));
    cluster.on("exit", worker => { 
        console.log("Cluster %d down", worker.process.pid);
        cluster.fork();
    });
}