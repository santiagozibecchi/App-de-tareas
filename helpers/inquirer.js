const inquirer = require('inquirer');
require('colors');

const preguntas = [
      {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                  {
                        value: '1',
                        name: `${'1'.cyan}. Crear tarea`
                  },
                  {
                        value: '2',
                        name: `${'2'.cyan}. Listar tarea`
                  },
                  {
                        value: '3',
                        name: `${'3'.cyan}. Listar tareas completadas`
                  },
                  {
                        value: '4',
                        name: `${'4'.cyan}. Listar tareas pendientes`
                  },
                  {
                        value: '5',
                        name: `${'5'.cyan}. Completar tarea`
                  },
                  {
                        value: '6',
                        name: `${'6'.cyan}. Borrar tarea`
                  },
                  {
                        value: '0',
                        name: `${'0'.cyan}. Salir`
                  }
            ]
      }
];


const inquirerMenu = async () => {

      console.clear();
      console.log('======================='.cyan);
      console.log(' Seleccione una opcion'.green);
      console.log('=======================\n'.cyan);

      const {opcion} = await inquirer.prompt(preguntas)

      return opcion;

}

const pausar = [
      {
            type: 'input',
            name: 'pausar',
            message: `Presione ${'ENTER'.cyan} para continuar`
      }
]

const inquirerPausa = async() => {

      console.log('\n');
      const pausa = await inquirer.prompt(pausar);
      return pausa;
}

const leerInput = async(message) => {

      const question = [
            {
                  type: 'input',
                  name: 'desc',
                  message,
                  validate(value) {
                        if (value.length === 0) {
                              return 'Por favor ingrese un valor';
                        }
                        return true;
                  }

            }
      ]

      const {desc} = await inquirer.prompt(question);
      return desc;
}


// Esto tiene que ser un menu para mostrar las tareas
const listadoTareasBorrar = async(tareas=[]) => {

      // Para manipular la informacion y crear el arreglo
      // Muestro en consola las opciones para borrar al usuario
      const choices = tareas.map((tarea, i) => {

            const idx = `${i+1}.`.cyan;

            return {
                  value: tarea.id,
                  name: `${idx} ${tarea.desc}`
            }
      });

      // Agregar una opcion (string) al inicio:
      choices.unshift({
            value: '0',
            name: '0.'.cyan + ' Presione enter para volver al menu principal'
      })

      const preguntas = [
            {
                  type: 'list',
                  name: 'id',
                  message: 'Borrar',
                  choices
            }
      ]

      const {id} = await inquirer.prompt(preguntas);
      return id;

}

// Para mostrar una confirmacion al usuario:
const confirmar = async(message) =>{

      const question = [
            {
                  type: 'confirm', // Regresa un valor bool.
                  name: 'ok',
                  message
            }
      ];

      const {ok} = await inquirer.prompt(question);
      return ok;
}

const mostrarListadochecklist = async (tareas = []) => {

      // Para manipular la informacion y crear el arreglo
      // Muestro en consola las opciones para borrar al usuario
      const choices = tareas.map((tarea, i) => {

            const idx = `${i + 1}.`.cyan;

            return {
                  value: tarea.id,
                  name: `${idx} ${tarea.desc}`,
                  checked: (tarea.completodaEn) ? true : false
            }
      });

      const pregunta = [
            {
                  type: 'checkbox',
                  name: 'ids',
                  message: 'Seleccione',
                  choices
            }
      ]

      const { ids } = await inquirer.prompt(pregunta);
      return ids;

}


module.exports = {
      inquirerMenu,
      inquirerPausa,
      leerInput,
      listadoTareasBorrar,
      confirmar,
      mostrarListadochecklist
}