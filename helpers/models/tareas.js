const Tarea = require('./tarea');

class Tareas {

      _listado = {};

      get listadoArr() {

            const listado = [];
            // Object.keys: Recibe un arreglo de todas las llaves
            // aplicando el forEach extraigo 
            Object.keys(this._listado).forEach(key => {
                  const tarea = this._listado[key];
                  listado.push(tarea);
            });
            return listado;
      }

      constructor() {
            this._listado = {};
      }

      borrarTarea(id = ' ') {

            if (this._listado[id]) {
                  delete this._listado[id];
            }
      }

      cargarTareasFromArray(tareas = []) {
            tareas.forEach(tarea => {
                  this._listado[tarea.id] = tarea;
            })
      }

      crearTarea(desc = ' ') {

            const tarea = new Tarea(desc);

            this._listado[tarea.id] = tarea;
      }

      listadoCompleto = () => {

            console.log();
            this.listadoArr.forEach((tarea, i) => {

                  let index = `${i + 1}`.cyan;
                  const { desc, completadoEn } = tarea;
                  const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
                  console.log(`${index}${'.'.cyan} ${desc} :: ${estado} `);
            })


      }

      listarPendientesCompletadas(completadas = true) {

            console.log();
            this.listadoArr.forEach(tarea => {

                  let contador = 0;
                  const { desc, completadoEn } = tarea;
                  const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

                  // El primer if-else es el responsable de caputarar el true-false que se manda por arguemento.
                  // Dicha funcion es basicamente para saber en que item colocar las respuestas que son falsas o verdaderas

                  if (completadas) {
                        // Mostrar las tareas completadas:
                        if (completadoEn) {
                              contador += 1
                              // Al sumar una variable con un string, autoaticamente se convierte en un string.
                              console.log(`${(contador + '.').cyan} ${desc} :: ${completadoEn.cyan}`);
                        }

                  } else {
                        if (!completadoEn) {
                              contador += 1
                              // Al sumar una variable con un string, autoaticamente se convierte en un string.
                              console.log(`${(contador + '.').cyan} ${desc} :: ${estado}`);
                        }
                  }

            })

      }

      // Recibir un arreglo de ids y establecer un procedimiento para
      // establecerlos si estan completados o no.
      toggleCompletadas = (ids = []) => {

            ids.forEach(id => {

                  const tarea = this._listado[id];
                  if (!tarea.completadoEn) {
                        tarea.completadoEn = new Date().toISOString();
                  }
            })

            // Para marcar como no completadas todas las tareas 
            // que no vengan en el arreglo de ids.
            this.listadoArr.forEach(tarea => {
                  // Si no existe
                  if (!ids.includes(tarea.id)) {
                        // const tarea = this._listado[tarea.id];
                        // tarea.completadoEn = null;
                        this._listado[tarea.id].completadoEn = null;
                  }
            })

      }

}


module.exports = Tareas;