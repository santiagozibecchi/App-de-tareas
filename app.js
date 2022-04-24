require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
      inquirerMenu,
      inquirerPausa,
      leerInput,
      listadoTareasBorrar,
      confirmar,
      mostrarListadochecklist
} = require('./helpers/inquirer');
const Tareas = require('./helpers/models/tareas');


const main = async() => {

      let opt = ' ';
      const tareas = new Tareas();
      const tareasDB = leerDB();

      if (tareasDB) {
            // Establecer tareas
            tareas.cargarTareasFromArray(tareasDB);
      }

      do {
            // Imprime el menu
            opt = await inquirerMenu();

            switch (opt) {
                  case '1':
                        // Crear opcion
                        const desc = await leerInput('Descripcion:');
                        tareas.crearTarea(desc);
                  break;
                  case '2':
                        tareas.listadoCompleto(tareasDB);
                  break;
                  case '3':
                        tareas.listarPendientesCompletadas(true);
                  break;
                  case '4':
                        tareas.listarPendientesCompletadas(false);
                  break;
                  case '5':
                        const ids = await mostrarListadochecklist(tareas.listadoArr);
                        tareas.toggleCompletadas(ids);
                  break;
                  case '6':
                        const id = await listadoTareasBorrar(tareas.listadoArr);
                        if ( id !== '0') {
                              // Preg. si esta seguro para borrar:
                              const ok = await confirmar('Esta seguro?');
                              // console.log({ok});
                              if (ok) {
                                    tareas.borrarTarea(id);
                                    console.log(' ----Tarea borrada----');
                              }
                        }
                  break;
            }

            guardarDB(tareas.listadoArr);

            await inquirerPausa();

      } while (opt !== '0');
        
}



main();