import { Task } from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ uid: req.uid }).isDeleted(false);
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const createTasks = async (req, res) => {
  try {
    const bodyTask = req.body;
    const task = new Task({
      tittle: bodyTask.tittle,
      description: bodyTask.description,
      priority: bodyTask.priority,
      uid: req.uid,
    });
    const newTask = await task.save();
    return res.status(201).json({ newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    const allowedUpdates = ["tittle", "description", "priority", "completed"];

    // Encontrar la tarea a actualizar
    const task = await Task.findById({ _id: taskId });
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Actualizar los campos que se enviaron en la solicitud
    allowedUpdates.forEach((update) => {
      if (updates[update]) {
        task[update] = updates[update];
      }
    });

    // Guardar los cambios en la base de datos
    await task.save();
    return res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ error: "No existe la tarea" });
    if (!task.uid.equals(req.uid))
      return res.status(401).json({ error: "No le pertenece esa tarea" });

    await task.softdelete();
    return res.json({ task });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Formato de id incorrecto" });
    }
    res.status(500).json({ error: "Error del servidor" });
  }
};
