import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pregunta {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.html',
  styleUrl: './test.css',
  encapsulation: ViewEncapsulation.None,
})
export class Test {
  testActivo: string | null = null;
  testTerminado = false;
  preguntas: Pregunta[] = [];
  preguntaActual = 0;
  respuestaSeleccionada: number | null = null;
  respondida = false;
  respuestaCorrecta = false;
  puntuacion = 0;
  letras = ['A', 'B', 'C', 'D'];

  get porcentaje(): number {
    return Math.round((this.puntuacion / this.preguntas.length) * 100);
  }

  iniciarTest(categoria: string) {
    this.testActivo = categoria;
    this.testTerminado = false;
    this.preguntaActual = 0;
    this.puntuacion = 0;
    this.respondida = false;
    this.respuestaSeleccionada = null;
    this.preguntas = this.getPreguntas(categoria);
  }

  responder(indice: number) {
    if (this.respondida) return;
    this.respuestaSeleccionada = indice;
    this.respondida = true;
    this.respuestaCorrecta = indice === this.preguntas[this.preguntaActual].correcta;
    if (this.respuestaCorrecta) this.puntuacion++;
  }

  siguiente() {
    if (this.preguntaActual + 1 >= this.preguntas.length) {
      this.testTerminado = true;
      return;
    }
    this.preguntaActual++;
    this.respondida = false;
    this.respuestaSeleccionada = null;
    this.respuestaCorrecta = false;
  }

  volverAlMenu() {
    this.testActivo = null;
    this.testTerminado = false;
    this.preguntaActual = 0;
    this.puntuacion = 0;
  }

  reiniciarTest() {
    if (this.testActivo) this.iniciarTest(this.testActivo);
  }

  getPreguntas(categoria: string): Pregunta[] {
    const banco: Record<string, Pregunta[]> = {
      java: [
        {
          pregunta: '¿Cuál es el método principal de entrada en Java?',
          opciones: ['start()', 'main()', 'run()', 'init()'],
          correcta: 1,
          explicacion: 'El método main() es el punto de entrada de cualquier aplicación Java.',
        },
        {
          pregunta: '¿Qué palabra clave se usa para heredar en Java?',
          opciones: ['implements', 'extends', 'inherits', 'super'],
          correcta: 1,
          explicacion: 'extends se usa para heredar de una clase en Java.',
        },
        {
          pregunta: '¿Cuál de estos no es un tipo primitivo en Java?',
          opciones: ['int', 'boolean', 'String', 'char'],
          correcta: 2,
          explicacion: 'String es una clase, no un tipo primitivo.',
        },
        {
          pregunta: "¿Qué hace la palabra clave 'final' en una variable?",
          opciones: [
            'La elimina',
            'La hace constante',
            'La convierte en global',
            'La hace privada',
          ],
          correcta: 1,
          explicacion: 'final hace que una variable no pueda ser reasignada.',
        },
        {
          pregunta: '¿Qué es JVM?',
          opciones: [
            'Java Virtual Machine',
            'Java Variable Method',
            'Java Version Manager',
            'Java Visual Mode',
          ],
          correcta: 0,
          explicacion: 'JVM significa Java Virtual Machine, el entorno de ejecución de Java.',
        },
        {
          pregunta: '¿Cuál es el tamaño de un int en Java?',
          opciones: ['8 bits', '16 bits', '32 bits', '64 bits'],
          correcta: 2,
          explicacion: 'Un int en Java ocupa 32 bits.',
        },
        {
          pregunta: '¿Qué interfaz implementan las clases que pueden ser ordenadas?',
          opciones: ['Sortable', 'Comparable', 'Ordered', 'Iterable'],
          correcta: 1,
          explicacion: 'Comparable permite definir el orden natural de objetos.',
        },
        {
          pregunta: '¿Qué hace System.out.println()?',
          opciones: [
            'Lee entrada',
            'Imprime y salta línea',
            'Imprime sin saltar línea',
            'Lanza excepción',
          ],
          correcta: 1,
          explicacion: 'println imprime el texto y añade un salto de línea al final.',
        },
        {
          pregunta: '¿Qué es un NullPointerException?',
          opciones: [
            'Error de tipo',
            'Acceso a referencia nula',
            'Overflow de memoria',
            'Error de compilación',
          ],
          correcta: 1,
          explicacion: 'Se lanza al intentar usar un objeto que es null.',
        },
        {
          pregunta: '¿Qué colección no permite duplicados?',
          opciones: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'],
          correcta: 2,
          explicacion: 'HashSet no permite elementos duplicados.',
        },
        {
          pregunta: '¿Qué modificador hace un miembro accesible solo dentro de su clase?',
          opciones: ['public', 'protected', 'private', 'default'],
          correcta: 2,
          explicacion: 'private restringe el acceso al interior de la clase.',
        },
        {
          pregunta: '¿Qué es el garbage collector en Java?',
          opciones: [
            'Un compilador',
            'Un gestor de memoria automático',
            'Un depurador',
            'Un optimizador',
          ],
          correcta: 1,
          explicacion: 'El garbage collector libera memoria de objetos no referenciados.',
        },
        {
          pregunta: '¿Cuál es la clase base de todas las clases en Java?',
          opciones: ['Base', 'Root', 'Object', 'Class'],
          correcta: 2,
          explicacion: 'Object es la superclase de todas las clases en Java.',
        },
        {
          pregunta: '¿Qué hace el operador instanceof?',
          opciones: ['Crea instancia', 'Comprueba tipo', 'Clona objeto', 'Destruye objeto'],
          correcta: 1,
          explicacion: 'instanceof verifica si un objeto es instancia de una clase.',
        },
        {
          pregunta: '¿Qué es una interfaz en Java?',
          opciones: [
            'Una clase abstracta total',
            'Un contrato de métodos',
            'Un tipo primitivo',
            'Una excepción',
          ],
          correcta: 1,
          explicacion: 'Una interfaz define un contrato que las clases deben implementar.',
        },
        {
          pregunta: '¿Cuál es la diferencia entre == y equals()?',
          opciones: [
            'No hay diferencia',
            '== compara referencias, equals() contenido',
            '== compara contenido, equals() referencias',
            'Solo se usa equals()',
          ],
          correcta: 1,
          explicacion: '== compara referencias de memoria, equals() compara el contenido.',
        },
        {
          pregunta: '¿Qué es un constructor en Java?',
          opciones: [
            'Un método que retorna void',
            'Un método especial para inicializar objetos',
            'Una variable estática',
            'Un tipo de bucle',
          ],
          correcta: 1,
          explicacion: 'El constructor inicializa un objeto cuando se crea con new.',
        },
        {
          pregunta: '¿Qué hace la palabra clave static?',
          opciones: [
            'Hace el método privado',
            'Asocia el miembro a la clase, no al objeto',
            'Hace la variable constante',
            'Impide herencia',
          ],
          correcta: 1,
          explicacion: 'static asocia el miembro a la clase en lugar de a instancias.',
        },
        {
          pregunta: '¿Qué es el polimorfismo?',
          opciones: [
            'Herencia múltiple',
            'Un objeto tomando múltiples formas',
            'Encapsulación de datos',
            'Un patrón de diseño',
          ],
          correcta: 1,
          explicacion:
            'El polimorfismo permite que objetos de diferentes clases respondan al mismo mensaje.',
        },
        {
          pregunta: '¿Qué excepción se lanza al dividir por cero?',
          opciones: [
            'NullPointerException',
            'ArithmeticException',
            'NumberFormatException',
            'IllegalArgumentException',
          ],
          correcta: 1,
          explicacion: 'ArithmeticException se lanza al dividir un entero por cero.',
        },
        {
          pregunta: '¿Qué es un ArrayList?',
          opciones: [
            'Array de tamaño fijo',
            'Lista dinámica basada en array',
            'Lista enlazada',
            'Cola de prioridad',
          ],
          correcta: 1,
          explicacion: 'ArrayList es una lista que crece dinámicamente basada en un array.',
        },
        {
          pregunta: '¿Qué hace try-catch?',
          opciones: [
            'Itera sobre colecciones',
            'Maneja excepciones',
            'Sincroniza hilos',
            'Crea objetos',
          ],
          correcta: 1,
          explicacion: 'try-catch captura y maneja excepciones en tiempo de ejecución.',
        },
        {
          pregunta: '¿Qué es la sobrecarga de métodos?',
          opciones: [
            'Redefinir método en subclase',
            'Múltiples métodos con el mismo nombre pero distintos parámetros',
            'Método que llama a otro',
            'Método abstracto',
          ],
          correcta: 1,
          explicacion:
            'La sobrecarga permite varios métodos con el mismo nombre pero diferente firma.',
        },
        {
          pregunta: '¿Qué tipo de dato almacena un char?',
          opciones: ['Número entero', 'Un carácter Unicode', 'Cadena de texto', 'Booleano'],
          correcta: 1,
          explicacion: 'char almacena un solo carácter Unicode de 16 bits.',
        },
        {
          pregunta: '¿Cuál es la palabra clave para crear un objeto?',
          opciones: ['create', 'new', 'make', 'build'],
          correcta: 1,
          explicacion: 'new crea una nueva instancia de una clase.',
        },
        {
          pregunta: '¿Qué es la encapsulación?',
          opciones: [
            'Ocultar implementación y exponer interfaz',
            'Herencia de clases',
            'Conversión de tipos',
            'Gestión de memoria',
          ],
          correcta: 0,
          explicacion: 'La encapsulación oculta los detalles internos y expone solo lo necesario.',
        },
        {
          pregunta: '¿Qué hace el bloque finally?',
          opciones: [
            'Captura excepciones',
            'Siempre se ejecuta',
            'Lanza excepciones',
            'Termina el programa',
          ],
          correcta: 1,
          explicacion: 'finally se ejecuta siempre, haya o no excepción.',
        },
        {
          pregunta: '¿Qué es un enum en Java?',
          opciones: [
            'Un tipo de bucle',
            'Un tipo especial con constantes nombradas',
            'Una interfaz',
            'Una anotación',
          ],
          correcta: 1,
          explicacion: 'enum define un conjunto fijo de constantes con nombre.',
        },
        {
          pregunta: '¿Qué hace Collections.sort()?',
          opciones: [
            'Invierte la lista',
            'Ordena una lista',
            'Elimina duplicados',
            'Mezcla aleatoriamente',
          ],
          correcta: 1,
          explicacion: 'Collections.sort() ordena una lista en orden natural o con comparador.',
        },
        {
          pregunta: '¿Qué es un hilo (Thread) en Java?',
          opciones: [
            'Un tipo de array',
            'Una unidad de ejecución concurrente',
            'Un método estático',
            'Un tipo de excepción',
          ],
          correcta: 1,
          explicacion: 'Un Thread permite ejecutar código de forma concurrente.',
        },
        {
          pregunta: '¿Qué anotación indica que un método sobreescribe otro?',
          opciones: ['@Override', '@Overwrite', '@Super', '@Inherit'],
          correcta: 0,
          explicacion: '@Override indica que el método sobreescribe uno de la superclase.',
        },
        {
          pregunta: '¿Qué es un Map en Java?',
          opciones: [
            'Lista ordenada',
            'Colección clave-valor',
            'Array bidimensional',
            'Cola de mensajes',
          ],
          correcta: 1,
          explicacion: 'Map almacena pares clave-valor sin claves duplicadas.',
        },
        {
          pregunta: '¿Qué hace la palabra clave abstract?',
          opciones: [
            'Hace la clase final',
            'Impide instanciar directamente',
            'Crea interfaz',
            'Hace método privado',
          ],
          correcta: 1,
          explicacion: 'abstract impide instanciar la clase directamente.',
        },
        {
          pregunta: '¿Qué es Maven?',
          opciones: [
            'IDE de Java',
            'Herramienta de gestión de proyectos',
            'Framework web',
            'Depurador',
          ],
          correcta: 1,
          explicacion: 'Maven gestiona dependencias y el ciclo de vida del proyecto.',
        },
        {
          pregunta: '¿Qué tipo retorna Math.random()?',
          opciones: ['int', 'float', 'double', 'long'],
          correcta: 2,
          explicacion: 'Math.random() retorna un double entre 0.0 y 1.0.',
        },
        {
          pregunta: '¿Qué es Spring Boot?',
          opciones: [
            'Lenguaje de programación',
            'Framework para aplicaciones Java',
            'Base de datos',
            'Sistema operativo',
          ],
          correcta: 1,
          explicacion: 'Spring Boot facilita crear aplicaciones Java standalone.',
        },
        {
          pregunta: '¿Qué hace String.valueOf()?',
          opciones: ['Compara strings', 'Convierte a String', 'Divide string', 'Busca en string'],
          correcta: 1,
          explicacion: 'String.valueOf() convierte distintos tipos a String.',
        },
        {
          pregunta: '¿Qué es la serialización en Java?',
          opciones: [
            'Ordenar datos',
            'Convertir objeto a bytes',
            'Comprimir archivos',
            'Cifrar datos',
          ],
          correcta: 1,
          explicacion: 'La serialización convierte un objeto en una secuencia de bytes.',
        },
        {
          pregunta: '¿Qué interfaz implementa ArrayList?',
          opciones: ['Set', 'Map', 'List', 'Queue'],
          correcta: 2,
          explicacion: 'ArrayList implementa la interfaz List.',
        },
        {
          pregunta: '¿Qué hace el operador ternario ?:',
          opciones: [
            'Itera',
            'Evalúa condición y retorna valor',
            'Compara referencias',
            'Lanza excepción',
          ],
          correcta: 1,
          explicacion: 'El operador ternario es una forma compacta de if-else.',
        },
        {
          pregunta: '¿Qué es JDK?',
          opciones: [
            'Java Development Kit',
            'Java Database Key',
            'Java Debug Kit',
            'Java Dynamic Kernel',
          ],
          correcta: 0,
          explicacion: 'JDK es el kit de desarrollo que incluye compilador y herramientas.',
        },
        {
          pregunta: '¿Qué hace el método toString()?',
          opciones: [
            'Convierte a número',
            'Retorna representación en String',
            'Compara objetos',
            'Clona objeto',
          ],
          correcta: 1,
          explicacion: 'toString() retorna una representación textual del objeto.',
        },
        {
          pregunta: '¿Qué es una lambda en Java 8?',
          opciones: [
            'Una clase anónima',
            'Una función anónima',
            'Un tipo primitivo',
            'Una anotación',
          ],
          correcta: 1,
          explicacion: 'Las lambdas son funciones anónimas introducidas en Java 8.',
        },
        {
          pregunta: '¿Qué hace Optional en Java?',
          opciones: [
            'Hace variables opcionales',
            'Evita NullPointerException',
            'Crea listas',
            'Gestiona hilos',
          ],
          correcta: 1,
          explicacion: 'Optional es un contenedor que puede o no contener un valor no nulo.',
        },
        {
          pregunta: '¿Qué es un Stream en Java 8?',
          opciones: [
            'Flujo de entrada/salida',
            'Secuencia de elementos procesados funcionalmente',
            'Hilo de ejecución',
            'Buffer de red',
          ],
          correcta: 1,
          explicacion: 'Stream permite procesar colecciones de forma declarativa y funcional.',
        },
        {
          pregunta: '¿Qué hace el método filter() en un Stream?',
          opciones: [
            'Transforma elementos',
            'Selecciona elementos que cumplen condición',
            'Ordena elementos',
            'Cuenta elementos',
          ],
          correcta: 1,
          explicacion: 'filter() retorna un Stream con los elementos que cumplen el predicado.',
        },
        {
          pregunta: '¿Cuál es la diferencia entre HashMap y TreeMap?',
          opciones: [
            'No hay diferencia',
            'TreeMap mantiene orden, HashMap no',
            'HashMap es más lento',
            'TreeMap no permite null',
          ],
          correcta: 1,
          explicacion: 'TreeMap mantiene las claves ordenadas, HashMap no garantiza orden.',
        },
        {
          pregunta: '¿Qué hace la anotación @FunctionalInterface?',
          opciones: [
            'Crea interfaz gráfica',
            'Indica que la interfaz tiene un solo método abstracto',
            'Hace la interfaz serializable',
            'Marca como deprecated',
          ],
          correcta: 1,
          explicacion:
            '@FunctionalInterface garantiza que la interfaz tenga exactamente un método abstracto.',
        },
        {
          pregunta: '¿Qué es el patrón Singleton?',
          opciones: [
            'Crea múltiples instancias',
            'Garantiza una única instancia de clase',
            'Hereda de una sola clase',
            'Implementa una interfaz',
          ],
          correcta: 1,
          explicacion: 'Singleton asegura que solo exista una instancia de la clase.',
        },
        {
          pregunta: '¿Qué hace Comparable.compareTo()?',
          opciones: [
            'Copia objeto',
            'Compara el orden entre objetos',
            'Clona objeto',
            'Hashea objeto',
          ],
          correcta: 1,
          explicacion: 'compareTo() retorna negativo, cero o positivo según el orden.',
        },
        {
          pregunta: '¿Qué es un checked exception?',
          opciones: [
            'Excepción en tiempo de compilación',
            'Excepción que debe ser declarada o capturada',
            'Error del sistema',
            'Excepción de runtime',
          ],
          correcta: 1,
          explicacion: 'Las checked exceptions deben ser manejadas o declaradas con throws.',
        },
        {
          pregunta: '¿Qué hace el método map() en un Stream?',
          opciones: [
            'Filtra elementos',
            'Transforma cada elemento',
            'Ordena elementos',
            'Agrupa elementos',
          ],
          correcta: 1,
          explicacion: 'map() aplica una función a cada elemento y retorna el resultado.',
        },
        {
          pregunta: '¿Qué es la herencia múltiple en Java?',
          opciones: [
            'Java la soporta con clases',
            'Java no la soporta con clases, sí con interfaces',
            'Java la soporta completamente',
            'Java no la soporta en ningún caso',
          ],
          correcta: 1,
          explicacion: 'Java no permite herencia múltiple de clases pero sí de interfaces.',
        },
        {
          pregunta: '¿Qué es un record en Java 16?',
          opciones: [
            'Una clase mutable',
            'Una clase inmutable para datos',
            'Una interfaz',
            'Un enum extendido',
          ],
          correcta: 1,
          explicacion: 'record es una clase inmutable para almacenar datos con menos boilerplate.',
        },
        {
          pregunta: '¿Qué hace synchronized?',
          opciones: [
            'Acelera ejecución',
            'Controla acceso concurrente',
            'Ordena colecciones',
            'Serializa objetos',
          ],
          correcta: 1,
          explicacion: 'synchronized garantiza que solo un hilo acceda al bloque a la vez.',
        },
        {
          pregunta: '¿Qué es un vararg en Java?',
          opciones: [
            'Variable global',
            'Parámetro de longitud variable',
            'Tipo genérico',
            'Array estático',
          ],
          correcta: 1,
          explicacion: 'varargs permite pasar un número variable de argumentos a un método.',
        },
        {
          pregunta: '¿Qué hace el método collect() en un Stream?',
          opciones: [
            'Filtra el stream',
            'Acumula resultados en una colección',
            'Ordena el stream',
            'Mapea el stream',
          ],
          correcta: 1,
          explicacion: 'collect() termina el stream acumulando los resultados.',
        },
        {
          pregunta: '¿Qué es Generics en Java?',
          opciones: [
            'Tipos dinámicos',
            'Tipos parametrizados para seguridad de tipos',
            'Tipos primitivos',
            'Tipos abstractos',
          ],
          correcta: 1,
          explicacion:
            'Generics permite escribir código que funciona con diferentes tipos de forma segura.',
        },
        {
          pregunta: '¿Qué anotación se usa para inyección de dependencias en Spring?',
          opciones: ['@Inject', '@Autowired', '@Component', '@Bean'],
          correcta: 1,
          explicacion: '@Autowired inyecta dependencias automáticamente en Spring.',
        },
        {
          pregunta: '¿Qué es el patrón Observer?',
          opciones: [
            'Crea objetos',
            'Notifica cambios a suscriptores',
            'Ordena colecciones',
            'Gestiona memoria',
          ],
          correcta: 1,
          explicacion: 'Observer define una dependencia uno-a-muchos para notificación de cambios.',
        },
        {
          pregunta: '¿Qué hace Iterator?',
          opciones: [
            'Ordena colecciones',
            'Permite recorrer colecciones',
            'Filtra colecciones',
            'Crea colecciones',
          ],
          correcta: 1,
          explicacion: 'Iterator proporciona una forma de recorrer elementos de una colección.',
        },
        {
          pregunta: '¿Qué es JPA?',
          opciones: [
            'Java Persistence API',
            'Java Process Architecture',
            'Java Platform API',
            'Java Parser Application',
          ],
          correcta: 0,
          explicacion: 'JPA es la API estándar para persistencia de objetos en bases de datos.',
        },
        {
          pregunta: '¿Qué hace el método reduce() en un Stream?',
          opciones: [
            'Filtra elementos',
            'Combina elementos en uno',
            'Duplica elementos',
            'Invierte el stream',
          ],
          correcta: 1,
          explicacion: 'reduce() combina todos los elementos del stream en un único resultado.',
        },
        {
          pregunta: '¿Cuál es la diferencia entre Stack y Queue?',
          opciones: [
            'No hay diferencia',
            'Stack es LIFO, Queue es FIFO',
            'Stack es FIFO, Queue es LIFO',
            'Ambos son FIFO',
          ],
          correcta: 1,
          explicacion: 'Stack es Last In First Out, Queue es First In First Out.',
        },
        {
          pregunta: '¿Qué es el método hashCode()?',
          opciones: [
            'Ordena objetos',
            'Retorna código entero del objeto',
            'Cifra el objeto',
            'Clona el objeto',
          ],
          correcta: 1,
          explicacion: 'hashCode() retorna un entero usado en estructuras como HashMap.',
        },
        {
          pregunta: '¿Qué hace el patrón Builder?',
          opciones: [
            'Hereda de múltiples clases',
            'Construye objetos complejos paso a paso',
            'Gestiona conexiones',
            'Crea proxies',
          ],
          correcta: 1,
          explicacion: 'Builder separa la construcción de un objeto complejo de su representación.',
        },
        {
          pregunta: '¿Qué es el principio SOLID?',
          opciones: [
            'Un patrón de diseño',
            'Cinco principios de diseño orientado a objetos',
            'Un framework',
            'Un tipo de herencia',
          ],
          correcta: 1,
          explicacion: 'SOLID son cinco principios para escribir código mantenible y escalable.',
        },
        {
          pregunta: '¿Qué hace la anotación @NotNull?',
          opciones: [
            'Hace variable final',
            'Indica que el valor no puede ser nulo',
            'Hace el método abstracto',
            'Marca para eliminar',
          ],
          correcta: 1,
          explicacion: '@NotNull es una anotación de validación que impide valores nulos.',
        },
        {
          pregunta: '¿Qué es el método equals() y por qué sobreescribirlo?',
          opciones: [
            'Para comparar referencias',
            'Para comparar contenido semántico de objetos',
            'Para ordenar objetos',
            'Para clonar objetos',
          ],
          correcta: 1,
          explicacion: 'Sobreescribir equals() permite comparar objetos por su contenido.',
        },
      ],
      python: [
        {
          pregunta: '¿Cómo se define una función en Python?',
          opciones: [
            'function miFuncion():',
            'def miFuncion():',
            'func miFuncion():',
            'define miFuncion():',
          ],
          correcta: 1,
          explicacion: 'En Python las funciones se definen con la palabra clave def.',
        },
        {
          pregunta: '¿Qué tipo de dato es [1, 2, 3]?',
          opciones: ['tuple', 'set', 'list', 'dict'],
          correcta: 2,
          explicacion: '[1, 2, 3] es una lista en Python.',
        },
        {
          pregunta: '¿Cómo se comenta una línea en Python?',
          opciones: ['//', '/* */', '#', '--'],
          correcta: 2,
          explicacion: 'El símbolo # se usa para comentarios de una línea en Python.',
        },
        {
          pregunta: '¿Qué hace len()?',
          opciones: ['Convierte a entero', 'Retorna longitud', 'Ordena lista', 'Elimina elemento'],
          correcta: 1,
          explicacion: 'len() retorna la longitud de una secuencia.',
        },
        {
          pregunta: '¿Qué es un diccionario en Python?',
          opciones: [
            'Lista ordenada',
            'Colección clave-valor',
            'Conjunto sin duplicados',
            'Tupla inmutable',
          ],
          correcta: 1,
          explicacion: 'Un diccionario almacena pares clave-valor.',
        },
        {
          pregunta: '¿Qué hace range(5)?',
          opciones: [
            'Crea lista [1,2,3,4,5]',
            'Crea secuencia [0,1,2,3,4]',
            'Crea lista vacía',
            'Retorna 5',
          ],
          correcta: 1,
          explicacion: 'range(5) genera secuencia de 0 a 4.',
        },
        {
          pregunta: '¿Cómo se hereda en Python?',
          opciones: [
            'class Hijo extends Padre',
            'class Hijo(Padre):',
            'class Hijo inherits Padre:',
            'class Hijo implements Padre:',
          ],
          correcta: 1,
          explicacion: 'La herencia se indica con el nombre de la clase padre entre paréntesis.',
        },
        {
          pregunta: '¿Qué es una tupla?',
          opciones: [
            'Lista mutable',
            'Secuencia inmutable',
            'Diccionario ordenado',
            'Conjunto con duplicados',
          ],
          correcta: 1,
          explicacion: 'Una tupla es una secuencia inmutable de elementos.',
        },
        {
          pregunta: '¿Qué hace append() en una lista?',
          opciones: [
            'Elimina último elemento',
            'Añade elemento al final',
            'Inserta al principio',
            'Ordena la lista',
          ],
          correcta: 1,
          explicacion: 'append() añade un elemento al final de la lista.',
        },
        {
          pregunta: '¿Qué es pip?',
          opciones: ['Editor de código', 'Gestor de paquetes', 'Intérprete', 'Depurador'],
          correcta: 1,
          explicacion: 'pip es el gestor de paquetes de Python.',
        },
        {
          pregunta: '¿Qué hace isinstance()?',
          opciones: [
            'Crea instancia',
            'Verifica si objeto es de cierto tipo',
            'Clona objeto',
            'Destruye objeto',
          ],
          correcta: 1,
          explicacion: 'isinstance() comprueba si un objeto es instancia de una clase.',
        },
        {
          pregunta: '¿Qué es una list comprehension?',
          opciones: [
            'Tipo de bucle',
            'Forma compacta de crear listas',
            'Método de lista',
            'Tipo de función',
          ],
          correcta: 1,
          explicacion: '[x for x in iterable] es una forma compacta de crear listas.',
        },
        {
          pregunta: '¿Qué hace strip() en un string?',
          opciones: [
            'Divide string',
            'Elimina espacios al inicio y fin',
            'Convierte a mayúsculas',
            'Invierte string',
          ],
          correcta: 1,
          explicacion: 'strip() elimina espacios en blanco al inicio y final del string.',
        },
        {
          pregunta: '¿Qué es __init__ en Python?',
          opciones: [
            'Método para destruir objetos',
            'Constructor de la clase',
            'Método estático',
            'Propiedad privada',
          ],
          correcta: 1,
          explicacion: '__init__ es el método constructor que inicializa el objeto.',
        },
        {
          pregunta: '¿Qué hace el operador ** en Python?',
          opciones: ['Multiplicación', 'Potencia', 'División entera', 'Módulo'],
          correcta: 1,
          explicacion: '** es el operador de potencia en Python.',
        },
        {
          pregunta: '¿Qué es None en Python?',
          opciones: ['Cero numérico', 'False booleano', 'Ausencia de valor', 'String vacío'],
          correcta: 2,
          explicacion: 'None representa la ausencia de valor, similar a null en otros lenguajes.',
        },
        {
          pregunta: '¿Qué hace zip() en Python?',
          opciones: [
            'Comprime archivos',
            'Combina iterables en pares',
            'Ordena listas',
            'Filtra elementos',
          ],
          correcta: 1,
          explicacion: 'zip() combina múltiples iterables elemento a elemento.',
        },
        {
          pregunta: '¿Qué es un decorador en Python?',
          opciones: [
            'Tipo de comentario',
            'Función que modifica otra función',
            'Clase abstracta',
            'Tipo de variable',
          ],
          correcta: 1,
          explicacion: 'Un decorador es una función que envuelve y modifica otra función.',
        },
        {
          pregunta: '¿Qué hace enumerate()?',
          opciones: [
            'Cuenta elementos',
            'Itera con índice y valor',
            'Ordena por índice',
            'Filtra por índice',
          ],
          correcta: 1,
          explicacion: 'enumerate() retorna pares (índice, valor) al iterar.',
        },
        {
          pregunta: '¿Qué es lambda en Python?',
          opciones: [
            'Tipo de clase',
            'Función anónima de una línea',
            'Módulo de Python',
            'Variable especial',
          ],
          correcta: 1,
          explicacion: 'lambda crea funciones anónimas compactas.',
        },
        {
          pregunta: '¿Qué hace sorted()?',
          opciones: [
            'Modifica la lista original',
            'Retorna nueva lista ordenada',
            'Ordena diccionario',
            'Invierte lista',
          ],
          correcta: 1,
          explicacion: 'sorted() retorna una nueva lista ordenada sin modificar la original.',
        },
        {
          pregunta: '¿Qué es un set en Python?',
          opciones: ['Lista ordenada', 'Colección sin duplicados', 'Diccionario', 'Tupla mutable'],
          correcta: 1,
          explicacion: 'Un set es una colección desordenada sin elementos duplicados.',
        },
        {
          pregunta: '¿Qué hace map()?',
          opciones: [
            'Crea diccionario',
            'Aplica función a cada elemento',
            'Filtra elementos',
            'Reduce colección',
          ],
          correcta: 1,
          explicacion: 'map() aplica una función a cada elemento de un iterable.',
        },
        {
          pregunta: '¿Qué es el slicing en Python?',
          opciones: [
            'Dividir string por separador',
            'Extraer subsecuencia con [inicio:fin]',
            'Eliminar elementos',
            'Copiar lista',
          ],
          correcta: 1,
          explicacion: 'Slicing extrae una porción de secuencia con la notación [inicio:fin].',
        },
        {
          pregunta: '¿Qué hace filter()?',
          opciones: [
            'Transforma elementos',
            'Selecciona elementos que cumplen condición',
            'Ordena colección',
            'Crea colección nueva',
          ],
          correcta: 1,
          explicacion: 'filter() retorna elementos para los que la función es True.',
        },
        {
          pregunta: '¿Qué es NumPy?',
          opciones: [
            'Framework web',
            'Librería para computación numérica',
            'Gestor de bases de datos',
            'IDE de Python',
          ],
          correcta: 1,
          explicacion:
            'NumPy es una librería para computación numérica y arrays multidimensionales.',
        },
        {
          pregunta: '¿Qué hace open() en Python?',
          opciones: ['Abre un puerto', 'Abre un archivo', 'Crea conexión de red', 'Inicia proceso'],
          correcta: 1,
          explicacion: 'open() abre un archivo para lectura, escritura u otras operaciones.',
        },
        {
          pregunta: '¿Qué es Django?',
          opciones: [
            'Librería de gráficos',
            'Framework web de Python',
            'Gestor de paquetes',
            'Intérprete alternativo',
          ],
          correcta: 1,
          explicacion: 'Django es un framework web de alto nivel para Python.',
        },
        {
          pregunta: '¿Qué hace try-except en Python?',
          opciones: ['Crea funciones', 'Maneja excepciones', 'Crea clases', 'Define módulos'],
          correcta: 1,
          explicacion: 'try-except captura y maneja excepciones.',
        },
        {
          pregunta: '¿Qué es __str__ en Python?',
          opciones: [
            'Variable de tipo string',
            'Método para representación textual',
            'Tipo de dato',
            'Módulo string',
          ],
          correcta: 1,
          explicacion: '__str__ define la representación en string de un objeto.',
        },
        {
          pregunta: '¿Qué hace any() en Python?',
          opciones: [
            'Verifica todos los elementos',
            'Retorna True si algún elemento es True',
            'Cuenta elementos True',
            'Filtra elementos False',
          ],
          correcta: 1,
          explicacion: 'any() retorna True si al menos un elemento del iterable es verdadero.',
        },
        {
          pregunta: '¿Qué hace all() en Python?',
          opciones: [
            'Retorna todos los elementos',
            'Retorna True si todos son True',
            'Suma todos los elementos',
            'Filtra elementos',
          ],
          correcta: 1,
          explicacion: 'all() retorna True solo si todos los elementos son verdaderos.',
        },
        {
          pregunta: '¿Qué es Pandas?',
          opciones: [
            'Framework web',
            'Librería para análisis de datos',
            'Gestor de paquetes',
            'Servidor web',
          ],
          correcta: 1,
          explicacion: 'Pandas es una librería para análisis y manipulación de datos.',
        },
        {
          pregunta: '¿Qué hace *args en Python?',
          opciones: [
            'Define argumento fijo',
            'Permite argumentos posicionales variables',
            'Crea puntero',
            'Define argumento de tipo',
          ],
          correcta: 1,
          explicacion: '*args permite pasar un número variable de argumentos posicionales.',
        },
        {
          pregunta: '¿Qué hace **kwargs?',
          opciones: [
            'Argumentos posicionales variables',
            'Argumentos de palabra clave variables',
            'Potencia de diccionario',
            'Combina diccionarios',
          ],
          correcta: 1,
          explicacion: '**kwargs permite pasar argumentos de palabra clave variables.',
        },
        {
          pregunta: '¿Qué es un generador en Python?',
          opciones: [
            'Crea números aleatorios',
            'Función que yield valores uno a uno',
            'Crea listas automáticamente',
            'Genera documentación',
          ],
          correcta: 1,
          explicacion: 'Un generador usa yield para producir valores uno a uno de forma lazy.',
        },
        {
          pregunta: '¿Qué hace with en Python?',
          opciones: [
            'Define condición',
            'Gestiona contexto y recursos automáticamente',
            'Crea módulo',
            'Define clase',
          ],
          correcta: 1,
          explicacion: 'with gestiona el contexto asegurando liberación de recursos.',
        },
        {
          pregunta: '¿Qué es la herencia múltiple en Python?',
          opciones: [
            'No está permitida',
            'Una clase hereda de varias clases',
            'Solo con interfaces',
            'Con mixins únicamente',
          ],
          correcta: 1,
          explicacion: 'Python sí permite herencia múltiple directamente.',
        },
        {
          pregunta: '¿Qué es PyPI?',
          opciones: [
            'Intérprete de Python',
            'Repositorio de paquetes Python',
            'IDE oficial',
            'Estándar de Python',
          ],
          correcta: 1,
          explicacion: 'PyPI es el repositorio oficial de paquetes de Python.',
        },
        {
          pregunta: '¿Qué hace join() en Python?',
          opciones: [
            'Une listas',
            'Une strings con separador',
            'Combina diccionarios',
            'Fusiona sets',
          ],
          correcta: 1,
          explicacion: 'join() concatena strings de un iterable usando un separador.',
        },
        {
          pregunta: '¿Qué es Flask?',
          opciones: [
            'ORM de Python',
            'Microframework web',
            'Gestor de base de datos',
            'Librería de gráficos',
          ],
          correcta: 1,
          explicacion: 'Flask es un microframework web ligero para Python.',
        },
        {
          pregunta: '¿Qué hace global en Python?',
          opciones: [
            'Crea variable pública',
            'Declara variable global dentro de función',
            'Importa módulo',
            'Define constante',
          ],
          correcta: 1,
          explicacion:
            'global permite modificar variables del ámbito global dentro de una función.',
        },
        {
          pregunta: '¿Qué es una excepción personalizada en Python?',
          opciones: [
            'Una excepción del sistema',
            'Clase que hereda de Exception',
            'Un tipo de error de sintaxis',
            'Un módulo de errores',
          ],
          correcta: 1,
          explicacion: 'Se crea heredando de Exception para definir errores específicos.',
        },
        {
          pregunta: '¿Qué hace copy() en Python?',
          opciones: [
            'Mueve objeto',
            'Crea copia superficial',
            'Crea copia profunda',
            'Clona módulo',
          ],
          correcta: 1,
          explicacion: 'copy() crea una copia superficial del objeto.',
        },
        {
          pregunta: '¿Qué es deepcopy()?',
          opciones: [
            'Copia referencia',
            'Copia superficial',
            'Copia completa independiente',
            'Copia solo primitivos',
          ],
          correcta: 2,
          explicacion: 'deepcopy() crea una copia completamente independiente del objeto.',
        },
        {
          pregunta: '¿Qué hace assert en Python?',
          opciones: [
            'Lanza excepción siempre',
            'Verifica condición y lanza AssertionError si falla',
            'Define variable',
            'Importa módulo',
          ],
          correcta: 1,
          explicacion: 'assert verifica una condición y lanza AssertionError si es False.',
        },
        {
          pregunta: '¿Qué es el GIL en Python?',
          opciones: [
            'Global Import Library',
            'Global Interpreter Lock',
            'Generic Iteration Loop',
            'Garbage Integration Layer',
          ],
          correcta: 1,
          explicacion:
            'El GIL es un mutex que impide ejecución de múltiples hilos Python a la vez.',
        },
        {
          pregunta: '¿Qué hace reversed()?',
          opciones: [
            'Ordena inversamente',
            'Retorna iterador en orden inverso',
            'Voltea string',
            'Invierte diccionario',
          ],
          correcta: 1,
          explicacion: 'reversed() retorna un iterador que recorre la secuencia al revés.',
        },
        {
          pregunta: '¿Qué es un módulo en Python?',
          opciones: [
            'Una clase especial',
            'Un archivo .py con código reutilizable',
            'Una función lambda',
            'Un tipo de dato',
          ],
          correcta: 1,
          explicacion: 'Un módulo es un archivo Python que contiene código reutilizable.',
        },
        {
          pregunta: '¿Qué hace __len__ en Python?',
          opciones: [
            'Retorna tipo de dato',
            'Define comportamiento de len()',
            'Retorna memoria usada',
            'Cuenta métodos',
          ],
          correcta: 1,
          explicacion: '__len__ permite que len() funcione con objetos personalizados.',
        },
        {
          pregunta: '¿Qué es Matplotlib?',
          opciones: [
            'Framework web',
            'Librería de visualización de datos',
            'ORM',
            'Gestor de paquetes',
          ],
          correcta: 1,
          explicacion: 'Matplotlib es una librería para crear gráficos y visualizaciones.',
        },
        {
          pregunta: '¿Qué hace pop() en una lista?',
          opciones: [
            'Añade elemento',
            'Elimina por índice y lo retorna',
            'Elimina elemento por valor',
            'Ordena la lista',
          ],
          correcta: 1,
          explicacion:
            'pop() elimina y retorna el elemento en una posición dada (por defecto el último).',
        },
        {
          pregunta: '¿Qué es una f-string en Python?',
          opciones: [
            'Formateo heredado',
            'Formateo de strings con f',
            'Librería de strings',
            'Función de formato',
          ],
          correcta: 1,
          explicacion: 'Las f-string permiten incrustar expresiones dentro de strings usando { }.',
        },
        {
          pregunta: '¿Qué hace la función repr()?',
          opciones: [
            'Representación legible',
            'Representación oficial para depuración',
            'Convierte a número',
            'Redondea decimales',
          ],
          correcta: 1,
          explicacion: 'repr() retorna una representación del objeto más detallada que str().',
        },
        {
          pregunta: '¿Qué es una variable de clase en Python?',
          opciones: [
            'Variable dentro de método',
            'Compartida por todas las instancias',
            'Variable local',
            'Constante inmutable',
          ],
          correcta: 1,
          explicacion:
            'Las variables de clase se definen dentro de la clase pero fuera de métodos y se comparten.',
        },
        {
          pregunta: '¿Qué hace @staticmethod en Python?',
          opciones: [
            'Define método estático',
            'Define propiedad',
            'Define clase abstracta',
            'Define decorador',
          ],
          correcta: 0,
          explicacion: '@staticmethod define un método que no recibe self ni cls.',
        },
        {
          pregunta: '¿Qué hace @classmethod?',
          opciones: [
            'Recibe la clase como primer argumento',
            'Recibe instancia',
            'Crea método privado',
            'Método final',
          ],
          correcta: 0,
          explicacion: '@classmethod recibe cls como primer argumento en lugar de self.',
        },
        {
          pregunta: '¿Qué es __slots__?',
          opciones: [
            'Lista de atributos permitidos',
            'Espacio para métodos',
            'Variable local',
            'Array de valores',
          ],
          correcta: 0,
          explicacion:
            '__slots__ restringe y optimiza los atributos que puede tener una instancia.',
        },
        {
          pregunta: '¿Qué hace super()?',
          opciones: [
            'Llama a clase padre',
            'Finaliza programa',
            'Crea superclase',
            'Destruye objeto',
          ],
          correcta: 0,
          explicacion: 'super() permite acceder a métodos de la clase padre desde una clase hija.',
        },
        {
          pregunta: '¿Qué es un decorador de clases?',
          opciones: [
            'Clase que decora otra clase',
            'Función que modifica clases',
            'Propiedad especial',
            'Método mágico',
          ],
          correcta: 1,
          explicacion: 'Un decorador de clases es una función que recibe y modifica una clase.',
        },
        {
          pregunta: '¿Qué es el método __call__?',
          opciones: [
            'Llama a otro método',
            'Permite que un objeto sea invocado como función',
            'Inicializa objeto',
            'Destruye objeto',
          ],
          correcta: 1,
          explicacion: '__call__ permite que una instancia se comporte como una función.',
        },
        {
          pregunta: '¿Qué es un contexto en Python?',
          opciones: [
            'Entorno de ejecución',
            'Objeto con __enter__ y __exit__',
            'Variable global',
            'Módulo principal',
          ],
          correcta: 1,
          explicacion: 'Los gestores de contexto usan __enter__ y __exit__ y se activan con with.',
        },
        {
          pregunta: '¿Qué hace iter()?',
          opciones: [
            'Repite código',
            'Obtiene iterador de un objeto iterable',
            'Suma números',
            'Convierte a entero',
          ],
          correcta: 1,
          explicacion: 'iter() retorna un iterador a partir de un iterable (lista, tupla, etc.).',
        },
        {
          pregunta: '¿Qué hace next()?',
          opciones: [
            'Siguiente elemento en iterador',
            'Último elemento',
            'Primer elemento',
            'Cuenta pasos',
          ],
          correcta: 0,
          explicacion: 'next() obtiene el siguiente elemento de un iterador y avanza.',
        },
        {
          pregunta: '¿Qué es el método __iter__?',
          opciones: [
            'Define objeto iterable',
            'Convierte a entero',
            'Inicia bucle',
            'Termina iteración',
          ],
          correcta: 0,
          explicacion: '__iter__ debe retornar un iterador, normalmente self en iteradores.',
        },
        {
          pregunta: '¿Qué es la sobrecarga de operadores en Python?',
          opciones: [
            'Repetir operación',
            'Definir comportamiento de operadores (+, -, etc.)',
            'Optimizar operación',
            'Ocultar operadores',
          ],
          correcta: 1,
          explicacion: 'Se logra definiendo métodos especiales como __add__ para +.',
        },
        {
          pregunta: '¿Qué hace el módulo sys?',
          opciones: [
            'Sistema operativo',
            'Funciones del sistema e intérprete',
            'Variables aleatorias',
            'Cálculos matemáticos',
          ],
          correcta: 1,
          explicacion: 'sys da acceso a variables y funciones relacionadas con el intérprete.',
        },
        {
          pregunta: '¿Qué hace el módulo os?',
          opciones: [
            'Opciones de sistema',
            'Interacción con sistema operativo',
            'Organización de archivos',
            'Optimización numérica',
          ],
          correcta: 1,
          explicacion:
            'os permite interactuar con el sistema operativo (archivos, procesos, entorno).',
        },
        {
          pregunta: '¿Qué es web scraping en Python?',
          opciones: [
            'Diseño web',
            'Extracción de datos de sitios web',
            'Servicio web',
            'Framework web',
          ],
          correcta: 1,
          explicacion:
            'Web scraping extrae información de páginas web usando librerías como BeautifulSoup.',
        },
        {
          pregunta: '¿Qué es BeautifulSoup?',
          opciones: ['Librería para scraping', 'Framework web', 'Base de datos', 'Servidor web'],
          correcta: 0,
          explicacion: 'BeautifulSoup se usa para parsear HTML/XML y extraer datos.',
        },
      ],
      javascript: [
        {
          pregunta: '¿Qué hace typeof en JavaScript?',
          opciones: ['Convierte tipo', 'Retorna el tipo de dato', 'Compara tipos', 'Elimina tipo'],
          correcta: 1,
          explicacion: 'typeof retorna un string con el tipo del operando.',
        },
        {
          pregunta: '¿Qué es undefined en JavaScript?',
          opciones: [
            'Variable declarada sin valor',
            'Valor nulo',
            'Error de tipo',
            'Variable no existente',
          ],
          correcta: 0,
          explicacion: 'undefined es el valor de una variable declarada pero no inicializada.',
        },
        {
          pregunta: '¿Cuál es la diferencia entre == y ===?',
          opciones: [
            'No hay diferencia',
            '== compara valor y tipo, === solo valor',
            '=== compara valor y tipo, == solo valor',
            '== es más estricto',
          ],
          correcta: 2,
          explicacion: '=== compara valor y tipo sin conversión, == puede convertir tipos.',
        },
        {
          pregunta: '¿Qué es el DOM?',
          opciones: [
            'Document Object Model',
            'Data Object Method',
            'Dynamic Object Map',
            'Document Output Mode',
          ],
          correcta: 0,
          explicacion: 'El DOM es la representación en árbol de los elementos HTML.',
        },
        {
          pregunta: '¿Qué hace addEventListener?',
          opciones: [
            'Crea elemento',
            'Asocia función a evento',
            'Elimina elemento',
            'Modifica estilo',
          ],
          correcta: 1,
          explicacion: 'addEventListener asocia un manejador a un evento del DOM.',
        },
        {
          pregunta: '¿Qué es una Promise?',
          opciones: [
            'Variable asíncrona',
            'Objeto que representa operación asíncrona',
            'Función flecha',
            'Tipo de bucle',
          ],
          correcta: 1,
          explicacion: 'Una Promise representa el resultado eventual de una operación asíncrona.',
        },
        {
          pregunta: '¿Qué hace async/await?',
          opciones: [
            'Crea hilos',
            'Simplifica trabajo con promesas',
            'Crea funciones síncronas',
            'Importa módulos',
          ],
          correcta: 1,
          explicacion: 'async/await permite escribir código asíncrono de forma síncrona.',
        },
        {
          pregunta: '¿Qué es el hoisting?',
          opciones: [
            'Optimización de bucles',
            'Elevación de declaraciones al inicio del ámbito',
            'Carga de módulos',
            'Gestión de memoria',
          ],
          correcta: 1,
          explicacion:
            'El hoisting mueve declaraciones de variables y funciones al inicio del ámbito.',
        },
        {
          pregunta: '¿Qué es el closure?',
          opciones: [
            'Cierre de conexión',
            'Función que accede a variables de su ámbito externo',
            'Tipo de bucle',
            'Método de array',
          ],
          correcta: 1,
          explicacion: 'Un closure es una función que recuerda las variables de su ámbito léxico.',
        },
        {
          pregunta: '¿Qué hace JSON.stringify()?',
          opciones: [
            'Parsea JSON',
            'Convierte objeto a string JSON',
            'Valida JSON',
            'Formatea JSON',
          ],
          correcta: 1,
          explicacion: 'JSON.stringify() convierte un objeto JavaScript a string JSON.',
        },
        {
          pregunta: '¿Qué hace Array.map()?',
          opciones: ['Filtra array', 'Transforma cada elemento', 'Reduce array', 'Ordena array'],
          correcta: 1,
          explicacion: 'map() crea un nuevo array aplicando función a cada elemento.',
        },
        {
          pregunta: '¿Qué es null en JavaScript?',
          opciones: [
            'Variable no declarada',
            'Ausencia intencional de valor',
            'Error de referencia',
            'String vacío',
          ],
          correcta: 1,
          explicacion: 'null es la ausencia intencional de valor de objeto.',
        },
        {
          pregunta: '¿Qué hace fetch()?',
          opciones: [
            'Almacena datos localmente',
            'Realiza peticiones HTTP',
            'Parsea HTML',
            'Gestiona cookies',
          ],
          correcta: 1,
          explicacion: 'fetch() realiza peticiones HTTP y retorna una Promise.',
        },
        {
          pregunta: '¿Qué es el event loop?',
          opciones: [
            'Bucle de eventos del DOM',
            'Mecanismo de concurrencia de JS',
            'Cola de animaciones',
            'Gestor de promesas',
          ],
          correcta: 1,
          explicacion: 'El event loop gestiona la ejecución asíncrona en JavaScript.',
        },
        {
          pregunta: '¿Qué hace spread operator (...)?',
          opciones: [
            'Crea iterador',
            'Expande elementos de iterable',
            'Desestructura objeto',
            'Clona función',
          ],
          correcta: 1,
          explicacion: 'El spread operator expande los elementos de un iterable.',
        },
        {
          pregunta: '¿Qué es la desestructuración?',
          opciones: [
            'Eliminar propiedades',
            'Extraer valores de arrays u objetos',
            'Clonar objetos',
            'Comparar objetos',
          ],
          correcta: 1,
          explicacion: 'La desestructuración extrae valores de arrays u objetos en variables.',
        },
        {
          pregunta: '¿Qué es localStorage?',
          opciones: [
            'Base de datos SQL',
            'Almacenamiento persistente en el navegador',
            'Cookie de sesión',
            'Cache del servidor',
          ],
          correcta: 1,
          explicacion: 'localStorage almacena datos persistentes en el navegador del cliente.',
        },
        {
          pregunta: '¿Qué hace setTimeout()?',
          opciones: [
            'Repite función periódicamente',
            'Ejecuta función después de un retardo',
            'Cancela ejecución',
            'Mide tiempo',
          ],
          correcta: 1,
          explicacion: 'setTimeout() ejecuta una función una vez pasado el tiempo indicado.',
        },
        {
          pregunta: '¿Qué es el prototype en JavaScript?',
          opciones: ['Tipo de clase', 'Mecanismo de herencia', 'Tipo de función', 'Método del DOM'],
          correcta: 1,
          explicacion: 'El prototype permite la herencia basada en objetos en JavaScript.',
        },
        {
          pregunta: '¿Qué hace Object.keys()?',
          opciones: [
            'Retorna valores',
            'Retorna array de claves del objeto',
            'Clona objeto',
            'Elimina claves',
          ],
          correcta: 1,
          explicacion: 'Object.keys() retorna array con los nombres de propiedades enumerables.',
        },
        {
          pregunta: '¿Qué es una función flecha?',
          opciones: [
            'Función nombrada',
            'Sintaxis compacta de función sin this propio',
            'Función generadora',
            'Función asíncrona',
          ],
          correcta: 1,
          explicacion: 'Las funciones flecha tienen sintaxis compacta y no tienen su propio this.',
        },
        {
          pregunta: '¿Qué hace Array.filter()?',
          opciones: [
            'Transforma elementos',
            'Retorna elementos que cumplen condición',
            'Ordena array',
            'Elimina duplicados',
          ],
          correcta: 1,
          explicacion: 'filter() crea nuevo array con elementos que pasan el test.',
        },
        {
          pregunta: '¿Qué es el contexto this?',
          opciones: [
            'Referencia al archivo',
            'Referencia al objeto actual',
            'Variable global',
            'Módulo actual',
          ],
          correcta: 1,
          explicacion: 'this hace referencia al objeto en cuyo contexto se ejecuta el código.',
        },
        {
          pregunta: '¿Qué hace Array.reduce()?',
          opciones: ['Filtra array', 'Acumula valores en uno', 'Ordena array', 'Divide array'],
          correcta: 1,
          explicacion: 'reduce() acumula los elementos del array en un único valor.',
        },
        {
          pregunta: '¿Qué es un módulo ES6?',
          opciones: [
            'Librería externa',
            'Archivo con import/export',
            'Función especial',
            'Clase abstracta',
          ],
          correcta: 1,
          explicacion: 'Los módulos ES6 usan import/export para compartir código entre archivos.',
        },
        {
          pregunta: '¿Qué hace Object.assign()?',
          opciones: [
            'Compara objetos',
            'Copia propiedades de objetos fuente al destino',
            'Clona profundamente',
            'Congela objeto',
          ],
          correcta: 1,
          explicacion:
            'Object.assign() copia propiedades enumerables de objetos fuente al destino.',
        },
        {
          pregunta: '¿Qué es un Symbol en JavaScript?',
          opciones: [
            'Tipo de string especial',
            'Tipo primitivo único e inmutable',
            'Constante matemática',
            'Referencia de función',
          ],
          correcta: 1,
          explicacion: 'Symbol crea valores únicos usados como identificadores de propiedades.',
        },
        {
          pregunta: '¿Qué hace Array.find()?',
          opciones: [
            'Filtra todos los que cumplen',
            'Retorna el primer elemento que cumple condición',
            'Busca índice',
            'Comprueba existencia',
          ],
          correcta: 1,
          explicacion: 'find() retorna el primer elemento que satisface la función.',
        },
        {
          pregunta: '¿Qué es el optional chaining ?.?',
          opciones: [
            'Operador de comparación',
            'Acceso seguro a propiedades anidadas',
            'Operador lógico',
            'Desestructuración',
          ],
          correcta: 1,
          explicacion: '?. evita errores al acceder a propiedades de valores null/undefined.',
        },
        {
          pregunta: '¿Qué hace el operador nullish coalescing ??',
          opciones: [
            'Compara nulos',
            'Retorna lado derecho si izquierdo es null/undefined',
            'Niega valor',
            'Asigna condicionalmente',
          ],
          correcta: 1,
          explicacion: '?? retorna el valor derecho cuando el izquierdo es null o undefined.',
        },
        {
          pregunta: '¿Qué es WeakMap?',
          opciones: [
            'Mapa ordenado',
            'Mapa con claves débilmente referenciadas',
            'Mapa inmutable',
            'Mapa sincronizado',
          ],
          correcta: 1,
          explicacion: 'WeakMap usa referencias débiles permitiendo recolección de basura.',
        },
        {
          pregunta: '¿Qué hace Promise.all()?',
          opciones: [
            'Ejecuta promesas secuencialmente',
            'Espera todas las promesas',
            'Retorna la más rápida',
            'Cancela todas',
          ],
          correcta: 1,
          explicacion: 'Promise.all() espera a que todas las promesas del array se resuelvan.',
        },
        {
          pregunta: '¿Qué es un generador en JS?',
          opciones: [
            'Función que crea arrays',
            'Función que puede pausar con yield',
            'Módulo generador',
            'Clase de iteración',
          ],
          correcta: 1,
          explicacion: 'Un generador usa function* y yield para producir valores bajo demanda.',
        },
        {
          pregunta: '¿Qué hace Object.freeze()?',
          opciones: [
            'Congela proceso',
            'Hace el objeto inmutable',
            'Serializa objeto',
            'Clona objeto',
          ],
          correcta: 1,
          explicacion: 'Object.freeze() previene modificaciones al objeto.',
        },
        {
          pregunta: '¿Qué es Proxy en JavaScript?',
          opciones: [
            'Servidor proxy',
            'Objeto que intercepta operaciones',
            'Tipo de promesa',
            'Módulo de red',
          ],
          correcta: 1,
          explicacion: 'Proxy permite interceptar y personalizar operaciones sobre objetos.',
        },
        {
          pregunta: '¿Qué es el patrón Module?',
          opciones: [
            'Sistema de módulos ES6',
            'Patrón que encapsula código privado',
            'Importación dinámica',
            'Namespace global',
          ],
          correcta: 1,
          explicacion: 'El patrón Module usa closures para encapsular código y exponer API.',
        },
        {
          pregunta: '¿Qué hace Array.flat()?',
          opciones: ['Ordena array', 'Aplana arrays anidados', 'Filtra null', 'Comprime array'],
          correcta: 1,
          explicacion: 'flat() crea nuevo array con subarrays concatenados hasta profundidad dada.',
        },
        {
          pregunta: '¿Qué es debouncing?',
          opciones: [
            'Tipo de evento',
            'Retrasar ejecución hasta que pare actividad',
            'Cancelar evento',
            'Optimizar bucle',
          ],
          correcta: 1,
          explicacion: 'Debouncing retrasa la ejecución de función hasta que pase inactividad.',
        },
        {
          pregunta: '¿Qué hace structuredClone()?',
          opciones: [
            'Copia superficial',
            'Copia profunda nativa',
            'Congela objeto',
            'Serializa a JSON',
          ],
          correcta: 1,
          explicacion: 'structuredClone() crea una copia profunda del objeto de forma nativa.',
        },
        {
          pregunta: '¿Qué es el patrón Observer en JS?',
          opciones: [
            'Sistema de módulos',
            'Patrón de suscripción a eventos',
            'Tipo de promesa',
            'Gestión del DOM',
          ],
          correcta: 1,
          explicacion:
            'Observer implementa suscripción para notificar cambios a múltiples oyentes.',
        },
        {
          pregunta: '¿Qué hace MutationObserver?',
          opciones: [
            'Observa cambios de red',
            'Observa cambios en el DOM',
            'Observa promesas',
            'Observa eventos',
          ],
          correcta: 1,
          explicacion: 'MutationObserver detecta cambios en el árbol DOM.',
        },
        {
          pregunta: '¿Qué es el Web Workers API?',
          opciones: [
            'API de trabajadores remotos',
            'Scripts en hilo secundario',
            'Gestor de servicios web',
            'API de animaciones',
          ],
          correcta: 1,
          explicacion: 'Web Workers permite ejecutar scripts en hilos secundarios sin bloquear UI.',
        },
        {
          pregunta: '¿Qué hace Array.from()?',
          opciones: [
            'Clona array',
            'Crea array desde iterable o array-like',
            'Convierte a string',
            'Verifica si es array',
          ],
          correcta: 1,
          explicacion: 'Array.from() crea un Array desde objetos iterables o similares a arrays.',
        },
        {
          pregunta: '¿Qué es el event bubbling?',
          opciones: [
            'Crear eventos',
            'Propagación de eventos de hijo a padre',
            'Cancelar eventos',
            'Captura de eventos',
          ],
          correcta: 1,
          explicacion: 'El bubbling propaga el evento desde el elemento origen hacia la raíz.',
        },
        {
          pregunta: '¿Qué hace preventDefault()?',
          opciones: [
            'Detiene propagación',
            'Cancela comportamiento por defecto',
            'Elimina evento',
            'Crea evento',
          ],
          correcta: 1,
          explicacion: 'preventDefault() cancela la acción predeterminada del evento.',
        },
        {
          pregunta: '¿Qué es el Service Worker?',
          opciones: [
            'Trabajador de servidor',
            'Script que actúa como proxy de red',
            'Hilo de UI',
            'Módulo de servicios',
          ],
          correcta: 1,
          explicacion: 'Service Worker actúa como proxy entre la app y la red, permite offline.',
        },
        {
          pregunta: '¿Qué hace Reflect en JavaScript?',
          opciones: [
            'Crea reflejo de objeto',
            'API para operaciones de metaprogramación',
            'Tipo de Proxy',
            'Módulo de reflexión',
          ],
          correcta: 1,
          explicacion: 'Reflect provee métodos para operaciones interceptables sobre objetos.',
        },
        {
          pregunta: '¿Qué es la coerción de tipos?',
          opciones: [
            'Conversión explícita',
            'Conversión implícita de tipos',
            'Eliminación de tipos',
            'Comparación de tipos',
          ],
          correcta: 1,
          explicacion: 'La coerción es la conversión automática de tipos que hace JavaScript.',
        },
        {
          pregunta: '¿Qué hace Array.every()?',
          opciones: [
            'Retorna todos los elementos',
            'Retorna true si todos cumplen condición',
            'Itera todos los elementos',
            'Cuenta elementos',
          ],
          correcta: 1,
          explicacion: 'every() retorna true solo si todos los elementos pasan el test.',
        },
        {
          pregunta: '¿Qué es Intl en JavaScript?',
          opciones: [
            'Módulo de internet',
            'API de internacionalización',
            'Módulo de integración',
            'Tipo de número',
          ],
          correcta: 1,
          explicacion:
            'Intl es la API de internacionalización para formatear fechas, números y textos.',
        },

        // NUEVAS PREGUNTAS (20) - TOTAL 70

        {
          pregunta: '¿Qué hace Array.some()?',
          opciones: [
            'Retorna true si algún elemento cumple condición',
            'Retorna false siempre',
            'Filtra elementos',
            'Transforma elementos',
          ],
          correcta: 0,
          explicacion: 'some() retorna true si al menos un elemento cumple la condición.',
        },
        {
          pregunta: '¿Qué es el mapa de bits (bitmap) en Canvas?',
          opciones: [
            'Array de píxeles',
            'Tipo de variable',
            'Función de dibujo',
            'Evento de ratón',
          ],
          correcta: 0,
          explicacion: 'Un bitmap representa cada píxel como datos en un array.',
        },
        {
          pregunta: '¿Qué hace history.pushState()?',
          opciones: [
            'Agrega estado al historial del navegador',
            'Borra historial',
            'Redirige página',
            'Recarga la página',
          ],
          correcta: 0,
          explicacion: 'pushState() añade una entrada al historial sin recargar.',
        },
        {
          pregunta: '¿Qué es EventTarget?',
          opciones: [
            'Clase base para eventos',
            'Tipo de evento',
            'Objeto global',
            'Función de callback',
          ],
          correcta: 0,
          explicacion: 'EventTarget es una interfaz que puede recibir eventos y tener oyentes.',
        },
        {
          pregunta: '¿Qué hace requestAnimationFrame()?',
          opciones: [
            'Pinta frames de animación',
            'Solicita datos de red',
            'Crea hilo',
            'Lee el DOM',
          ],
          correcta: 0,
          explicacion: 'Optimiza animaciones sincronizando con el refresco de pantalla.',
        },
        {
          pregunta: '¿Qué es una promesa resuelta?',
          opciones: [
            'Promise que terminó en fulfilled',
            'Promise cancelada',
            'Promise sin then',
            'Promise rechazada',
          ],
          correcta: 0,
          explicacion: 'Promesa resuelta significa que se completó exitosamente.',
        },
        {
          pregunta: '¿Qué hace console.trace()?',
          opciones: [
            'Muestra la pila de llamadas',
            'Limpia consola',
            'Mide tiempo',
            'Cuenta repeticiones',
          ],
          correcta: 0,
          explicacion: 'console.trace() imprime el stack trace actual.',
        },
        {
          pregunta: '¿Qué es un polyfill?',
          opciones: [
            'Código que implementa funcionalidades modernas en navegadores antiguos',
            'Estilo CSS',
            'Framework CSS',
            'Plugin de webpack',
          ],
          correcta: 0,
          explicacion: 'Polyfill replica APIs modernas en entornos antiguos.',
        },
        {
          pregunta: '¿Qué hace el operador delete?',
          opciones: [
            'Elimina propiedad de objeto o elemento de array',
            'Borra variable',
            'Limpia memoria',
            'Elimina archivo',
          ],
          correcta: 0,
          explicacion: 'delete quita una propiedad de un objeto (no afecta longitud de arrays).',
        },
        {
          pregunta: '¿Qué es NaN?',
          opciones: ['Not a Number', 'Null and None', 'New array', 'Non action'],
          correcta: 0,
          explicacion: 'NaN representa un valor numérico inválido o indeterminado.',
        },
        {
          pregunta: '¿Qué hace el método bind()?',
          opciones: [
            'Crea nueva función con this fijo',
            'Ejecuta función inmediatamente',
            'Une dos objetos',
            'Fusiona arrays',
          ],
          correcta: 0,
          explicacion: 'bind() retorna una función con el this especificado.',
        },
        {
          pregunta: '¿Qué es la delegación de eventos?',
          opciones: [
            'Manejar eventos en padre usando bubbling',
            'Pasar evento a child',
            'Cancelar evento',
            'Evento único',
          ],
          correcta: 0,
          explicacion: 'Delegación asigna un listener al padre para manejar eventos de hijos.',
        },
        {
          pregunta: '¿Qué hace el operador instanceof?',
          opciones: [
            'Verifica si objeto es instancia de clase',
            'Crea instancia',
            'Elimina instancia',
            'Copia objeto',
          ],
          correcta: 0,
          explicacion: 'instanceof comprueba la cadena de prototipos.',
        },
        {
          pregunta: '¿Qué es el modo estricto (strict mode)?',
          opciones: [
            'Modo con reglas más estrictas y seguras',
            'Modo lento',
            'Modo de depuración',
            'Modo de compatibilidad',
          ],
          correcta: 0,
          explicacion:
            'El modo estricto elimina comportamientos silenciosos y lanza más excepciones.',
        },
        {
          pregunta: '¿Qué hace Promise.race()?',
          opciones: [
            'Retorna la primera promesa en resolverse o rechazarse',
            'Espera todas',
            'Cancela promesas',
            'Ejecuta en serie',
          ],
          correcta: 0,
          explicacion: 'Promise.race() retorna el resultado de la promesa más rápida.',
        },
        {
          pregunta: '¿Qué es la función constructora?',
          opciones: [
            'Función que crea objetos con new',
            'Función flecha',
            'Función anónima',
            'Función autoinvocada',
          ],
          correcta: 0,
          explicacion: 'Las constructoras inicializan objetos con new.',
        },
        {
          pregunta: '¿Qué hace el método toFixed()?',
          opciones: [
            'Formatea número con decimales fijos',
            'Redondea entero',
            'Convierte a entero',
            'Formatea moneda',
          ],
          correcta: 0,
          explicacion: 'toFixed() retorna string con número de decimales especificado.',
        },
        {
          pregunta: '¿Qué es la propiedad length en arrays?',
          opciones: [
            'Número de elementos',
            'Tamaño en bytes',
            'Longitud de string',
            'Profundidad del array',
          ],
          correcta: 0,
          explicacion: 'length indica cuántos elementos tiene el array.',
        },
        {
          pregunta: '¿Qué hace el método some()?',
          opciones: [
            'Retorna true si algún elemento cumple',
            'Retorna todos los elementos',
            'Filtra elementos',
            'Ordena elementos',
          ],
          correcta: 0,
          explicacion: 'some() es parecido a every() pero más flexible.',
        },
        {
          pregunta: '¿Qué es una cookie?',
          opciones: [
            'Dato pequeño almacenado por el navegador',
            'Variable de sesión',
            'Base de datos',
            'Cache de red',
          ],
          correcta: 0,
          explicacion: 'Las cookies almacenan datos en pares clave-valor.',
        },
      ],
      sql: [
        {
          pregunta: '¿Qué hace SELECT * FROM tabla?',
          opciones: [
            'Borra todos los registros',
            'Selecciona todas las columnas',
            'Actualiza registros',
            'Crea tabla',
          ],
          correcta: 1,
          explicacion: 'SELECT * FROM retorna todas las columnas de la tabla.',
        },
        {
          pregunta: '¿Qué hace WHERE en SQL?',
          opciones: [
            'Ordena resultados',
            'Filtra registros por condición',
            'Agrupa registros',
            'Une tablas',
          ],
          correcta: 1,
          explicacion: 'WHERE filtra las filas que cumplen la condición especificada.',
        },
        {
          pregunta: '¿Qué hace ORDER BY?',
          opciones: [
            'Filtra registros',
            'Ordena resultados',
            'Agrupa registros',
            'Limita registros',
          ],
          correcta: 1,
          explicacion: 'ORDER BY ordena los resultados por una o más columnas.',
        },
        {
          pregunta: '¿Qué es una clave primaria?',
          opciones: [
            'Clave de cifrado',
            'Identificador único de fila',
            'Índice de búsqueda',
            'Clave foránea',
          ],
          correcta: 1,
          explicacion: 'La clave primaria identifica de forma única cada fila de una tabla.',
        },
        {
          pregunta: '¿Qué hace GROUP BY?',
          opciones: [
            'Ordena registros',
            'Agrupa filas con mismo valor',
            'Filtra grupos',
            'Une tablas',
          ],
          correcta: 1,
          explicacion: 'GROUP BY agrupa filas que tienen el mismo valor en columnas especificadas.',
        },
        {
          pregunta: '¿Qué hace JOIN?',
          opciones: [
            'Divide tabla',
            'Combina filas de dos tablas',
            'Crea índice',
            'Elimina duplicados',
          ],
          correcta: 1,
          explicacion: 'JOIN combina filas de dos tablas basándose en columna relacionada.',
        },
        {
          pregunta: '¿Qué diferencia hay entre INNER JOIN y LEFT JOIN?',
          opciones: [
            'No hay diferencia',
            'INNER retorna coincidencias, LEFT incluye todas de la izquierda',
            'LEFT retorna solo coincidencias',
            'INNER retorna todas las filas',
          ],
          correcta: 1,
          explicacion:
            'INNER JOIN solo filas con coincidencia, LEFT JOIN todas las de la tabla izquierda.',
        },
        {
          pregunta: '¿Qué hace HAVING?',
          opciones: [
            'Filtra filas antes de agrupar',
            'Filtra grupos después de GROUP BY',
            'Ordena grupos',
            'Une grupos',
          ],
          correcta: 1,
          explicacion: 'HAVING filtra grupos después de que GROUP BY los haya creado.',
        },
        {
          pregunta: '¿Qué hace COUNT()?',
          opciones: ['Suma valores', 'Cuenta filas', 'Promedia valores', 'Retorna máximo'],
          correcta: 1,
          explicacion: 'COUNT() retorna el número de filas que cumplen la condición.',
        },
        {
          pregunta: '¿Qué es una clave foránea?',
          opciones: [
            'Clave en otro idioma',
            'Referencia a clave primaria de otra tabla',
            'Índice secundario',
            'Clave encriptada',
          ],
          correcta: 1,
          explicacion: 'La clave foránea establece relación entre dos tablas.',
        },
        {
          pregunta: '¿Qué hace DISTINCT?',
          opciones: ['Ordena resultados', 'Elimina duplicados', 'Filtra nulos', 'Cuenta únicos'],
          correcta: 1,
          explicacion: 'DISTINCT retorna solo valores únicos eliminando duplicados.',
        },
        {
          pregunta: '¿Qué hace UPDATE?',
          opciones: [
            'Inserta registros',
            'Modifica registros existentes',
            'Borra registros',
            'Crea tabla',
          ],
          correcta: 1,
          explicacion: 'UPDATE modifica los valores de registros existentes.',
        },
        {
          pregunta: '¿Qué hace DELETE?',
          opciones: ['Borra tabla', 'Elimina registros', 'Actualiza registros', 'Trunca tabla'],
          correcta: 1,
          explicacion: 'DELETE elimina filas de una tabla según condición.',
        },
        {
          pregunta: '¿Qué hace INSERT INTO?',
          opciones: [
            'Crea tabla',
            'Inserta nuevos registros',
            'Actualiza registros',
            'Selecciona registros',
          ],
          correcta: 1,
          explicacion: 'INSERT INTO añade nuevas filas a una tabla.',
        },
        {
          pregunta: '¿Qué hace TRUNCATE?',
          opciones: [
            'Borra tabla',
            'Elimina todos los registros rápidamente',
            'Elimina columna',
            'Comprime tabla',
          ],
          correcta: 1,
          explicacion: 'TRUNCATE elimina todos los registros de forma rápida sin log por fila.',
        },
        {
          pregunta: '¿Qué es una transacción?',
          opciones: [
            'Consulta SELECT',
            'Unidad de trabajo atómica',
            'Tipo de índice',
            'Procedimiento almacenado',
          ],
          correcta: 1,
          explicacion:
            'Una transacción es un conjunto de operaciones que se ejecutan como una unidad.',
        },
        {
          pregunta: '¿Qué hace COMMIT?',
          opciones: [
            'Cancela transacción',
            'Confirma los cambios de la transacción',
            'Inicia transacción',
            'Crea punto de guardado',
          ],
          correcta: 1,
          explicacion: 'COMMIT confirma permanentemente los cambios de la transacción.',
        },
        {
          pregunta: '¿Qué hace ROLLBACK?',
          opciones: [
            'Confirma cambios',
            'Deshace cambios de la transacción',
            'Crea backup',
            'Optimiza tabla',
          ],
          correcta: 1,
          explicacion: 'ROLLBACK deshace los cambios no confirmados de la transacción.',
        },
        {
          pregunta: '¿Qué es un índice en SQL?',
          opciones: [
            'Número de fila',
            'Estructura que acelera búsquedas',
            'Tipo de clave',
            'Vista de tabla',
          ],
          correcta: 1,
          explicacion: 'Un índice mejora la velocidad de recuperación de datos.',
        },
        {
          pregunta: '¿Qué hace LIKE en SQL?',
          opciones: [
            'Compara exactamente',
            'Busca patrón en string',
            'Compara rangos',
            'Verifica existencia',
          ],
          correcta: 1,
          explicacion: 'LIKE busca un patrón específico usando wildcards % y _.',
        },
        {
          pregunta: '¿Qué hace IS NULL?',
          opciones: [
            'Busca string "null"',
            'Comprueba si valor es NULL',
            'Elimina nulos',
            'Convierte a cero',
          ],
          correcta: 1,
          explicacion: 'IS NULL comprueba si un campo tiene valor NULL.',
        },
        {
          pregunta: '¿Qué hace COALESCE()?',
          opciones: [
            'Cuenta nulos',
            'Retorna primer valor no nulo',
            'Elimina duplicados',
            'Convierte tipos',
          ],
          correcta: 1,
          explicacion: 'COALESCE retorna el primer argumento que no es NULL.',
        },
        {
          pregunta: '¿Qué es una vista (VIEW)?',
          opciones: [
            'Copia de tabla',
            'Consulta almacenada como tabla virtual',
            'Índice especial',
            'Procedimiento',
          ],
          correcta: 1,
          explicacion: 'Una vista es una consulta guardada que actúa como tabla virtual.',
        },
        {
          pregunta: '¿Qué hace UNION?',
          opciones: [
            'Une tablas',
            'Combina resultados de dos SELECT',
            'Crea relación',
            'Intersecta conjuntos',
          ],
          correcta: 1,
          explicacion: 'UNION combina los resultados de dos o más SELECT eliminando duplicados.',
        },
        {
          pregunta: '¿Qué diferencia UNION de UNION ALL?',
          opciones: [
            'No hay diferencia',
            'UNION ALL incluye duplicados',
            'UNION ALL elimina duplicados',
            'UNION es más rápido',
          ],
          correcta: 1,
          explicacion: 'UNION ALL incluye todos los registros incluyendo duplicados, UNION no.',
        },
        {
          pregunta: '¿Qué hace BETWEEN?',
          opciones: [
            'Compara dos valores',
            'Filtra en un rango inclusivo',
            'Busca en lista',
            'Compara strings',
          ],
          correcta: 1,
          explicacion: 'BETWEEN filtra valores dentro de un rango inclusive.',
        },
        {
          pregunta: '¿Qué hace IN en SQL?',
          opciones: [
            'Verifica pertenencia a tabla',
            'Comprueba si valor está en lista',
            'Une tablas',
            'Filtra nulos',
          ],
          correcta: 1,
          explicacion: 'IN comprueba si un valor está dentro de una lista de valores.',
        },
        {
          pregunta: '¿Qué es un procedimiento almacenado?',
          opciones: [
            'Vista especial',
            'Conjunto de instrucciones SQL guardadas',
            'Tipo de índice',
            'Clave foránea',
          ],
          correcta: 1,
          explicacion:
            'Un procedimiento almacenado es código SQL guardado que puede ser reutilizado.',
        },
        {
          pregunta: '¿Qué hace AVG()?',
          opciones: ['Retorna máximo', 'Calcula promedio', 'Cuenta registros', 'Retorna mínimo'],
          correcta: 1,
          explicacion: 'AVG() calcula el valor promedio de una columna numérica.',
        },
        {
          pregunta: '¿Qué es normalización en SQL?',
          opciones: [
            'Ordenar datos',
            'Organizar tablas para reducir redundancia',
            'Crear índices',
            'Comprimir datos',
          ],
          correcta: 1,
          explicacion: 'La normalización organiza la base de datos para minimizar redundancia.',
        },
        {
          pregunta: '¿Qué es la primera forma normal (1FN)?',
          opciones: [
            'Eliminar redundancia',
            'Valores atómicos y sin grupos repetidos',
            'Crear clave primaria',
            'Eliminar nulos',
          ],
          correcta: 1,
          explicacion: '1FN requiere que cada columna contenga valores atómicos e indivisibles.',
        },
        {
          pregunta: '¿Qué hace CONCAT() en SQL?',
          opciones: [
            'Cuenta caracteres',
            'Une strings',
            'Busca substring',
            'Convierte a mayúsculas',
          ],
          correcta: 1,
          explicacion: 'CONCAT() une dos o más strings en uno.',
        },
        {
          pregunta: '¿Qué hace UPPER()?',
          opciones: [
            'Limita resultados',
            'Convierte a mayúsculas',
            'Retorna longitud',
            'Elimina espacios',
          ],
          correcta: 1,
          explicacion: 'UPPER() convierte un string a mayúsculas.',
        },
        {
          pregunta: '¿Qué hace LOWER()?',
          opciones: [
            'Convierte a minúsculas',
            'Reduce longitud',
            'Elimina vocales',
            'Compara sin sensibilidad',
          ],
          correcta: 0,
          explicacion: 'LOWER() convierte un string a minúsculas.',
        },
        {
          pregunta: '¿Qué hace TRIM()?',
          opciones: [
            'Corta string por la mitad',
            'Elimina espacios al inicio y fin',
            'Limita caracteres',
            'Busca patrón',
          ],
          correcta: 1,
          explicacion: 'TRIM() elimina espacios en blanco al inicio y final de un string.',
        },
        {
          pregunta: '¿Qué es un subquery?',
          opciones: [
            'Consulta en otro servidor',
            'Consulta anidada dentro de otra',
            'Vista temporal',
            'Procedimiento anidado',
          ],
          correcta: 1,
          explicacion: 'Un subquery es una consulta SELECT dentro de otra consulta.',
        },
        {
          pregunta: '¿Qué hace EXISTS?',
          opciones: [
            'Verifica si tabla existe',
            'Comprueba si subquery retorna filas',
            'Cuenta registros',
            'Verifica conexión',
          ],
          correcta: 1,
          explicacion: 'EXISTS retorna true si el subquery retorna al menos una fila.',
        },
        {
          pregunta: '¿Qué es un trigger?',
          opciones: [
            'Índice automático',
            'Acción automática ante evento en tabla',
            'Tipo de vista',
            'Constraint especial',
          ],
          correcta: 1,
          explicacion: 'Un trigger ejecuta código automáticamente ante INSERT, UPDATE o DELETE.',
        },
        {
          pregunta: '¿Qué hace LIMIT?',
          opciones: [
            'Filtra por valor máximo',
            'Limita número de filas retornadas',
            'Pagina resultados',
            'Restringe acceso',
          ],
          correcta: 1,
          explicacion: 'LIMIT especifica el número máximo de filas a retornar.',
        },
        {
          pregunta: '¿Qué es ACID en bases de datos?',
          opciones: [
            'Algoritmo de cifrado',
            'Propiedades de transacciones: Atomicidad, Consistencia, Aislamiento, Durabilidad',
            'Tipo de índice',
            'Protocolo de red',
          ],
          correcta: 1,
          explicacion: 'ACID garantiza la fiabilidad de las transacciones en bases de datos.',
        },
        {
          pregunta: '¿Qué es un deadlock?',
          opciones: [
            'Base de datos sin datos',
            'Bloqueo mutuo entre transacciones',
            'Error de sintaxis',
            'Tabla corrupta',
          ],
          correcta: 1,
          explicacion: 'Un deadlock ocurre cuando dos transacciones se bloquean mutuamente.',
        },
        {
          pregunta: '¿Qué hace CASE en SQL?',
          opciones: [
            'Convierte tipos',
            'Lógica condicional como if-else',
            'Crea clave',
            'Filtra nulos',
          ],
          correcta: 1,
          explicacion: 'CASE permite expresiones condicionales en consultas SQL.',
        },
        {
          pregunta: '¿Qué hace ROW_NUMBER()?',
          opciones: [
            'Cuenta filas totales',
            'Asigna número secuencial a cada fila',
            'Retorna ID',
            'Ordena sin numerar',
          ],
          correcta: 1,
          explicacion: 'ROW_NUMBER() asigna un número único secuencial a cada fila del resultado.',
        },
        {
          pregunta: '¿Qué es un CTE (Common Table Expression)?',
          opciones: [
            'Tipo de índice',
            'Conjunto de resultados temporal nombrado',
            'Procedimiento temporal',
            'Vista permanente',
          ],
          correcta: 1,
          explicacion: 'Un CTE es un conjunto de resultados temporal definido con WITH.',
        },
        {
          pregunta: '¿Qué hace PARTITION BY?',
          opciones: [
            'Divide la tabla físicamente',
            'Divide resultados en grupos para funciones ventana',
            'Crea particiones de disco',
            'Filtra por partición',
          ],
          correcta: 1,
          explicacion:
            'PARTITION BY divide el conjunto de resultados en particiones para funciones de ventana.',
        },
        {
          pregunta: '¿Qué diferencia DELETE de DROP?',
          opciones: [
            'No hay diferencia',
            'DELETE elimina registros, DROP elimina la tabla',
            'DROP elimina registros',
            'DELETE elimina la tabla',
          ],
          correcta: 1,
          explicacion: 'DELETE borra filas de la tabla, DROP elimina la tabla completa.',
        },
        {
          pregunta: '¿Qué es la cardinalidad en SQL?',
          opciones: [
            'Número de tablas',
            'Número de valores únicos en columna',
            'Tipo de relación',
            'Número de índices',
          ],
          correcta: 1,
          explicacion: 'La cardinalidad indica cuántos valores únicos tiene una columna.',
        },
        {
          pregunta: '¿Qué hace FLOOR()?',
          opciones: [
            'Redondea al alza',
            'Redondea al entero inferior',
            'Retorna parte decimal',
            'Calcula raíz',
          ],
          correcta: 1,
          explicacion: 'FLOOR() retorna el mayor entero menor o igual al número dado.',
        },
        {
          pregunta: '¿Qué es un esquema en SQL?',
          opciones: [
            'Tipo de tabla',
            'Contenedor lógico de objetos de base de datos',
            'Diagrama ER',
            'Tipo de índice',
          ],
          correcta: 1,
          explicacion: 'Un esquema es un contenedor que agrupa objetos de la base de datos.',
        },
        {
          pregunta: '¿Qué hace CAST() en SQL?',
          opciones: [
            'Crea tabla temporal',
            'Convierte valor a otro tipo de dato',
            'Filtra por tipo',
            'Valida tipo',
          ],
          correcta: 1,
          explicacion: 'CAST() convierte un valor de un tipo de dato a otro.',
        },
        {
          pregunta: '¿Qué es un RIGHT JOIN?',
          opciones: [
            'Une a la derecha',
            'Retorna todas las filas de la tabla derecha',
            'Solo filas coincidentes',
            'Retorna filas de ambas tablas',
          ],
          correcta: 1,
          explicacion:
            'RIGHT JOIN retorna todas las filas de la tabla derecha aunque no haya coincidencia.',
        },
        {
          pregunta: '¿Qué hace SUM()?',
          opciones: [
            'Cuenta filas',
            'Suma los valores de una columna',
            'Promedia valores',
            'Retorna el máximo',
          ],
          correcta: 1,
          explicacion: 'SUM() retorna la suma total de una columna numérica.',
        },
        {
          pregunta: '¿Qué hace MIN()?',
          opciones: [
            'Retorna el valor más pequeño',
            'Retorna el primer registro',
            'Elimina duplicados',
            'Filtra nulos',
          ],
          correcta: 0,
          explicacion: 'MIN() retorna el valor mínimo de una columna.',
        },
        {
          pregunta: '¿Qué hace MAX()?',
          opciones: [
            'Retorna el valor más grande',
            'Retorna el último registro',
            'Cuenta valores',
            'Redondea hacia arriba',
          ],
          correcta: 0,
          explicacion: 'MAX() retorna el valor máximo de una columna.',
        },
        {
          pregunta: '¿Qué es AUTO_INCREMENT?',
          opciones: [
            'Tipo de dato',
            'Columna que se incrementa sola al insertar',
            'Clave foránea',
            'Índice automático',
          ],
          correcta: 1,
          explicacion: 'AUTO_INCREMENT genera un valor único secuencial automáticamente.',
        },
        {
          pregunta: '¿Qué hace DEFAULT en SQL?',
          opciones: [
            'Valor por defecto para una columna',
            'Función de agregación',
            'Tipo de join',
            'Clave primaria',
          ],
          correcta: 0,
          explicacion: 'DEFAULT asigna un valor predeterminado a una columna si no se especifica.',
        },
        {
          pregunta: '¿Qué es una función de agregación?',
          opciones: [
            'Función matemática',
            'Función que opera sobre múltiples filas y retorna un solo valor',
            'Función de string',
            'Función de fecha',
          ],
          correcta: 1,
          explicacion: 'Ejemplos: COUNT, SUM, AVG, MIN, MAX.',
        },
        {
          pregunta: '¿Qué hace NOW() en SQL?',
          opciones: [
            'Inserta hora fija',
            'Retorna fecha y hora actual',
            'Crea timestamp',
            'Calcula diferencia',
          ],
          correcta: 1,
          explicacion: 'NOW() retorna la fecha y hora actual del sistema.',
        },
        {
          pregunta: '¿Qué es un índice único?',
          opciones: [
            'Índice que solo acepta nulos',
            'Índice que no permite valores duplicados',
            'Clave primaria',
            'Índice automático',
          ],
          correcta: 1,
          explicacion:
            'Un índice único garantiza que todos los valores en la columna sean distintos.',
        },
        {
          pregunta: '¿Qué es un full outer join?',
          opciones: [
            'Une solo izquierda',
            'Une solo derecha',
            'Retorna todas las filas de ambas tablas',
            'No existe en SQL',
          ],
          correcta: 2,
          explicacion:
            'FULL OUTER JOIN retorna todas las filas cuando hay coincidencia en una de las tablas.',
        },
        {
          pregunta: '¿Qué hace IFNULL()?',
          opciones: [
            'Retorna primer valor no nulo',
            'Reemplaza NULL por un valor específico',
            'Elimina nulos',
            'Compara nulos',
          ],
          correcta: 1,
          explicacion: 'IFNULL() retorna un valor alternativo si el primero es NULL.',
        },
        {
          pregunta: '¿Qué es un alias en SQL?',
          opciones: [
            'Otro nombre para tabla o columna',
            'Tipo de dato',
            'Función especial',
            'Índice secundario',
          ],
          correcta: 0,
          explicacion: 'AS permite renombrar temporalmente una tabla o columna.',
        },
        {
          pregunta: '¿Qué hace LENGTH()?',
          opciones: [
            'Retorna longitud de string',
            'Cuenta palabras',
            'Tamaño en bytes',
            'Número de columnas',
          ],
          correcta: 0,
          explicacion: 'LENGTH() o LEN() retorna el número de caracteres de un string.',
        },
        {
          pregunta: '¿Qué es la segunda forma normal (2FN)?',
          opciones: [
            'Eliminar dependencias parciales',
            'Valores atómicos',
            'Eliminar dependencias transitivas',
            'Clave primaria compuesta',
          ],
          correcta: 0,
          explicacion: '2FN requiere que todos los atributos dependan de toda la clave primaria.',
        },
        {
          pregunta: '¿Qué hace REVOKE?',
          opciones: ['Da permisos', 'Quita permisos a un usuario', 'Crea usuario', 'Elimina tabla'],
          correcta: 1,
          explicacion: 'REVOKE elimina privilegios previamente otorgados con GRANT.',
        },
        {
          pregunta: '¿Qué hace GRANT?',
          opciones: [
            'Otorga permisos a usuarios',
            'Crea base de datos',
            'Asigna claves',
            'Da acceso remoto',
          ],
          correcta: 0,
          explicacion: 'GRANT asigna privilegios específicos a usuarios o roles.',
        },
      ],
      ciberseguridad: [
        {
          pregunta: '¿Qué es el phishing?',
          opciones: [
            'Ataque de fuerza bruta',
            'Suplantación para robar credenciales',
            'Virus de red',
            'Ataque DDoS',
          ],
          correcta: 1,
          explicacion: 'El phishing engaña al usuario para que revele información confidencial.',
        },
        {
          pregunta: '¿Qué es un firewall?',
          opciones: ['Antivirus', 'Sistema que controla tráfico de red', 'VPN', 'Proxy'],
          correcta: 1,
          explicacion: 'Un firewall filtra el tráfico de red según reglas de seguridad.',
        },
        {
          pregunta: '¿Qué es el cifrado simétrico?',
          opciones: [
            'Usa clave pública y privada',
            'Usa la misma clave para cifrar y descifrar',
            'No usa clave',
            'Usa múltiples claves',
          ],
          correcta: 1,
          explicacion: 'El cifrado simétrico usa la misma clave para cifrar y descifrar.',
        },
        {
          pregunta: '¿Qué es un ataque DDoS?',
          opciones: [
            'Robo de contraseñas',
            'Saturación de servicio con múltiples peticiones',
            'Inyección SQL',
            'Interceptación de datos',
          ],
          correcta: 1,
          explicacion: 'DDoS satura un servidor con peticiones para dejarlo inaccesible.',
        },
        {
          pregunta: '¿Qué es SQL Injection?',
          opciones: [
            'Virus de base de datos',
            'Inserción de código SQL malicioso',
            'Backup de base de datos',
            'Error de SQL',
          ],
          correcta: 1,
          explicacion: 'SQL Injection inserta código SQL malicioso en campos de entrada.',
        },
        {
          pregunta: '¿Qué es XSS?',
          opciones: [
            'Protocolo de seguridad',
            'Inyección de scripts en páginas web',
            'Tipo de firewall',
            'Algoritmo de cifrado',
          ],
          correcta: 1,
          explicacion: 'XSS (Cross-Site Scripting) inyecta scripts maliciosos en páginas web.',
        },
        {
          pregunta: '¿Qué es un certificado SSL/TLS?',
          opciones: [
            'Contraseña de servidor',
            'Certificado que garantiza comunicación cifrada',
            'Tipo de firewall',
            'Protocolo de red',
          ],
          correcta: 1,
          explicacion: 'SSL/TLS cifra la comunicación entre cliente y servidor.',
        },
        {
          pregunta: '¿Qué es el principio de mínimo privilegio?',
          opciones: [
            'Dar todos los permisos',
            'Dar solo los permisos necesarios',
            'Eliminar usuarios',
            'Bloquear acceso',
          ],
          correcta: 1,
          explicacion: 'El mínimo privilegio otorga solo los permisos necesarios para la tarea.',
        },
        {
          pregunta: '¿Qué es un hash?',
          opciones: [
            'Tipo de cifrado reversible',
            'Función que genera huella única de datos',
            'Contraseña cifrada',
            'Protocolo de red',
          ],
          correcta: 1,
          explicacion:
            'Un hash es una función que genera una cadena única e irreversible de los datos.',
        },
        {
          pregunta: '¿Qué es la autenticación de dos factores?',
          opciones: [
            'Dos contraseñas',
            'Verificación con dos métodos distintos',
            'Dos usuarios',
            'Doble firewall',
          ],
          correcta: 1,
          explicacion: '2FA requiere dos formas distintas de verificar la identidad.',
        },
        {
          pregunta: '¿Qué es un malware?',
          opciones: [
            'Software defectuoso',
            'Software malicioso',
            'Software antiguo',
            'Software lento',
          ],
          correcta: 1,
          explicacion: 'Malware es cualquier software diseñado para dañar o comprometer sistemas.',
        },
        {
          pregunta: '¿Qué es un ransomware?',
          opciones: [
            'Virus que borra datos',
            'Malware que cifra datos y pide rescate',
            'Spyware',
            'Adware',
          ],
          correcta: 1,
          explicacion:
            'El ransomware cifra los archivos del usuario y exige pago para recuperarlos.',
        },
        {
          pregunta: '¿Qué es una VPN?',
          opciones: [
            'Antivirus virtual',
            'Red privada virtual que cifra comunicaciones',
            'Firewall avanzado',
            'Proxy anónimo',
          ],
          correcta: 1,
          explicacion: 'Una VPN crea un túnel cifrado para proteger las comunicaciones.',
        },
        {
          pregunta: '¿Qué es un zero-day?',
          opciones: [
            'Ataque antiguo',
            'Vulnerabilidad desconocida sin parche',
            'Ataque planificado',
            'Error de código',
          ],
          correcta: 1,
          explicacion:
            'Un zero-day es una vulnerabilidad sin parche conocida solo por el atacante.',
        },
        {
          pregunta: '¿Qué es ingeniería social?',
          opciones: [
            'Hacking técnico',
            'Manipulación psicológica para obtener información',
            'Ataque de red',
            'Virus social',
          ],
          correcta: 1,
          explicacion:
            'La ingeniería social manipula a personas para revelar información confidencial.',
        },
        {
          pregunta: '¿Qué es AES?',
          opciones: [
            'Protocolo de red',
            'Estándar de cifrado simétrico avanzado',
            'Algoritmo de hash',
            'Tipo de firewall',
          ],
          correcta: 1,
          explicacion:
            'AES (Advanced Encryption Standard) es un estándar de cifrado simétrico muy usado.',
        },
        {
          pregunta: '¿Qué es RSA?',
          opciones: [
            'Algoritmo de hash',
            'Algoritmo de cifrado asimétrico',
            'Protocolo SSL',
            'Tipo de VPN',
          ],
          correcta: 1,
          explicacion: 'RSA es un algoritmo de cifrado asimétrico basado en clave pública/privada.',
        },
        {
          pregunta: '¿Qué es un pentest?',
          opciones: [
            'Tipo de antivirus',
            'Prueba de penetración para detectar vulnerabilidades',
            'Análisis de malware',
            'Auditoría de red',
          ],
          correcta: 1,
          explicacion: 'El pentesting simula ataques para descubrir vulnerabilidades de seguridad.',
        },
        {
          pregunta: '¿Qué es OWASP?',
          opciones: [
            'Protocolo web',
            'Organización que lista vulnerabilidades web',
            'Tipo de firewall',
            'Estándar SSL',
          ],
          correcta: 1,
          explicacion: 'OWASP publica el Top 10 de vulnerabilidades web más críticas.',
        },
        {
          pregunta: '¿Qué es un ataque Man-in-the-Middle?',
          opciones: [
            'Ataque de fuerza bruta',
            'Interceptación de comunicaciones entre dos partes',
            'Ataque DDoS',
            'Inyección de código',
          ],
          correcta: 1,
          explicacion: 'MitM intercepta y puede modificar comunicaciones entre dos partes.',
        },
        {
          pregunta: '¿Qué es el hardening?',
          opciones: [
            'Cifrado de disco',
            'Proceso de asegurar un sistema reduciendo vulnerabilidades',
            'Tipo de firewall',
            'Backup de seguridad',
          ],
          correcta: 1,
          explicacion:
            'El hardening minimiza la superficie de ataque configurando el sistema de forma segura.',
        },
        {
          pregunta: '¿Qué es un IDS?',
          opciones: [
            'Sistema de cifrado',
            'Sistema de detección de intrusiones',
            'Tipo de VPN',
            'Protocolo de red',
          ],
          correcta: 1,
          explicacion: 'Un IDS detecta actividades sospechosas o maliciosas en la red.',
        },
        {
          pregunta: '¿Qué es el CSRF?',
          opciones: [
            'Tipo de virus',
            'Ataque que fuerza acciones no deseadas en sesión autenticada',
            'Protocolo de seguridad',
            'Tipo de cifrado',
          ],
          correcta: 1,
          explicacion: 'CSRF engaña al usuario autenticado para ejecutar acciones no deseadas.',
        },
        {
          pregunta: '¿Qué es la esteganografía?',
          opciones: [
            'Tipo de cifrado',
            'Técnica de ocultar información dentro de otro archivo',
            'Protocolo de red',
            'Análisis de tráfico',
          ],
          correcta: 1,
          explicacion:
            'La esteganografía oculta información dentro de otros archivos como imágenes.',
        },
        {
          pregunta: '¿Qué es un rootkit?',
          opciones: [
            'Antivirus',
            'Malware que oculta su presencia en el sistema',
            'Tipo de firewall',
            'Exploit',
          ],
          correcta: 1,
          explicacion: 'Un rootkit se oculta en el sistema para mantener acceso persistente.',
        },
        {
          pregunta: '¿Qué es la criptografía de clave pública?',
          opciones: [
            'Usa clave compartida',
            'Usa par de claves pública y privada',
            'No usa claves',
            'Usa contraseña',
          ],
          correcta: 1,
          explicacion:
            'La criptografía asimétrica usa clave pública para cifrar y privada para descifrar.',
        },
        {
          pregunta: '¿Qué es un exploit?',
          opciones: [
            'Tipo de antivirus',
            'Código que aprovecha una vulnerabilidad',
            'Protocolo de seguridad',
            'Tipo de log',
          ],
          correcta: 1,
          explicacion:
            'Un exploit es código diseñado para aprovechar una vulnerabilidad específica.',
        },
        {
          pregunta: '¿Qué es la autenticación OAuth?',
          opciones: [
            'Protocolo de cifrado',
            'Protocolo de autorización de acceso delegado',
            'Tipo de VPN',
            'Sistema de contraseñas',
          ],
          correcta: 1,
          explicacion:
            'OAuth permite autorizar aplicaciones a acceder a recursos sin compartir contraseñas.',
        },
        {
          pregunta: '¿Qué es el análisis forense digital?',
          opciones: [
            'Diseño de redes',
            'Investigación de evidencias digitales',
            'Tipo de hacking',
            'Auditoría de código',
          ],
          correcta: 1,
          explicacion: 'El análisis forense recupera y analiza evidencias digitales de incidentes.',
        },
        {
          pregunta: '¿Qué es un honeypot?',
          opciones: [
            'Tipo de malware',
            'Sistema trampa para atraer atacantes',
            'Protocolo de red',
            'Tipo de cifrado',
          ],
          correcta: 1,
          explicacion: 'Un honeypot simula sistema vulnerable para detectar y estudiar atacantes.',
        },
        {
          pregunta: '¿Qué es SHA-256?',
          opciones: [
            'Algoritmo de cifrado',
            'Función hash criptográfica',
            'Protocolo SSL',
            'Tipo de certificado',
          ],
          correcta: 1,
          explicacion: 'SHA-256 es una función hash criptográfica que genera digest de 256 bits.',
        },
        {
          pregunta: '¿Qué es el modelo Zero Trust?',
          opciones: [
            'No confiar en ninguna entidad sin verificar',
            'Desactivar todos los firewalls',
            'Eliminar contraseñas',
            'Confiar en red interna',
          ],
          correcta: 0,
          explicacion:
            'Zero Trust asume que ninguna entidad es confiable sin verificación explícita.',
        },
        {
          pregunta: '¿Qué es un ataque de fuerza bruta?',
          opciones: [
            'Ataque físico',
            'Probar todas las combinaciones posibles',
            'Inyección de código',
            'Interceptación de red',
          ],
          correcta: 1,
          explicacion:
            'La fuerza bruta prueba sistemáticamente todas las combinaciones hasta encontrar la correcta.',
        },
        {
          pregunta: '¿Qué es HTTPS?',
          opciones: [
            'HTTP con autenticación',
            'HTTP con cifrado TLS',
            'HTTP más rápido',
            'Protocolo FTP',
          ],
          correcta: 1,
          explicacion: 'HTTPS es HTTP con cifrado TLS/SSL para comunicación segura.',
        },
        {
          pregunta: '¿Qué es un certificado digital?',
          opciones: [
            'Contraseña digital',
            'Documento electrónico que verifica identidad',
            'Tipo de cifrado',
            'Protocolo de red',
          ],
          correcta: 1,
          explicacion:
            'Un certificado digital verifica la identidad de entidades en comunicaciones digitales.',
        },
        {
          pregunta: '¿Qué es el SIEM?',
          opciones: [
            'Sistema de cifrado',
            'Sistema de gestión de eventos e información de seguridad',
            'Tipo de IDS',
            'Firewall avanzado',
          ],
          correcta: 1,
          explicacion: 'SIEM agrega y analiza logs de seguridad para detectar amenazas.',
        },
        {
          pregunta: '¿Qué es un payload en ciberseguridad?',
          opciones: [
            'Datos legítimos',
            'Parte maliciosa del malware',
            'Protocolo de red',
            'Tipo de cifrado',
          ],
          correcta: 1,
          explicacion: 'El payload es la parte del malware que ejecuta la acción maliciosa.',
        },
        {
          pregunta: '¿Qué es RBAC?',
          opciones: [
            'Protocolo de red',
            'Control de acceso basado en roles',
            'Tipo de cifrado',
            'Sistema de logs',
          ],
          correcta: 1,
          explicacion: 'RBAC asigna permisos a roles y luego roles a usuarios.',
        },
        {
          pregunta: '¿Qué es el threat hunting?',
          opciones: [
            'Tipo de antivirus',
            'Búsqueda proactiva de amenazas ocultas',
            'Análisis de logs',
            'Escaneo de puertos',
          ],
          correcta: 1,
          explicacion:
            'Threat hunting busca proactivamente amenazas que evaden controles automáticos.',
        },
        {
          pregunta: '¿Qué es un backdoor?',
          opciones: [
            'Puerto de red',
            'Acceso oculto a sistema sin autenticación normal',
            'Tipo de firewall',
            'Protocolo seguro',
          ],
          correcta: 1,
          explicacion: 'Un backdoor es un acceso no documentado que evita la autenticación normal.',
        },
        {
          pregunta: '¿Qué es la seguridad por oscuridad?',
          opciones: [
            'Cifrado avanzado',
            'Basar seguridad en mantener secreto el diseño',
            'Protocolo seguro',
            'Tipo de firewall',
          ],
          correcta: 1,
          explicacion:
            'La seguridad por oscuridad depende del secreto del diseño, considerada insuficiente.',
        },
        {
          pregunta: '¿Qué es un ataque de diccionario?',
          opciones: [
            'Ataque lingüístico',
            'Usar lista de palabras comunes para descifrar contraseñas',
            'Análisis de texto',
            'Tipo de DoS',
          ],
          correcta: 1,
          explicacion:
            'Un ataque de diccionario prueba palabras comunes para adivinar contraseñas.',
        },
        {
          pregunta: '¿Qué es la superficie de ataque?',
          opciones: [
            'Área física del servidor',
            'Conjunto de puntos vulnerables de un sistema',
            'Tipo de red',
            'Protocolo de ataque',
          ],
          correcta: 1,
          explicacion:
            'La superficie de ataque es el conjunto de puntos donde un atacante puede intentar entrar.',
        },
        {
          pregunta: '¿Qué es el sandboxing?',
          opciones: [
            'Tipo de cifrado',
            'Ejecución de código en entorno aislado',
            'Protocolo de red',
            'Tipo de firewall',
          ],
          correcta: 1,
          explicacion:
            'El sandboxing ejecuta código en entorno aislado para prevenir daño al sistema real.',
        },
        {
          pregunta: '¿Qué es la gestión de parches?',
          opciones: [
            'Diseño de software',
            'Proceso de aplicar actualizaciones de seguridad',
            'Auditoría de red',
            'Tipo de backup',
          ],
          correcta: 1,
          explicacion:
            'La gestión de parches asegura que el software tenga las últimas correcciones de seguridad.',
        },
        {
          pregunta: '¿Qué es PII?',
          opciones: [
            'Protocolo de Internet',
            'Información de identificación personal',
            'Tipo de cifrado',
            'Nivel de privilegio',
          ],
          correcta: 1,
          explicacion: 'PII es información que puede identificar a una persona específica.',
        },
        {
          pregunta: '¿Qué es GDPR?',
          opciones: [
            'Protocolo de seguridad',
            'Reglamento europeo de protección de datos',
            'Tipo de cifrado',
            'Estándar ISO',
          ],
          correcta: 1,
          explicacion: 'GDPR es el Reglamento General de Protección de Datos de la UE.',
        },
        {
          pregunta: '¿Qué es el CVE?',
          opciones: [
            'Tipo de virus',
            'Sistema de identificación de vulnerabilidades conocidas',
            'Protocolo de seguridad',
            'Tipo de exploit',
          ],
          correcta: 1,
          explicacion:
            'CVE es un sistema de identificadores únicos para vulnerabilidades de seguridad conocidas.',
        },
        {
          pregunta: '¿Qué es la autenticación JWT?',
          opciones: [
            'Protocolo de red',
            'Token compacto para transmitir claims',
            'Tipo de sesión',
            'Algoritmo de cifrado',
          ],
          correcta: 1,
          explicacion:
            'JWT (JSON Web Token) es un estándar para transmitir información de forma segura.',
        },
        {
          pregunta: '¿Qué es el port scanning?',
          opciones: [
            'Tipo de firewall',
            'Técnica para descubrir puertos abiertos',
            'Protocolo de red',
            'Tipo de VPN',
          ],
          correcta: 1,
          explicacion:
            'El port scanning identifica qué puertos de red están abiertos en un sistema.',
        },
        {
          pregunta: '¿Qué es la ciberhigiene?',
          opciones: [
            'Limpieza de hardware',
            'Prácticas básicas de seguridad digital',
            'Tipo de antivirus',
            'Protocolo de red',
          ],
          correcta: 1,
          explicacion: 'La ciberhigiene son prácticas básicas para mantener la seguridad digital.',
        },
        {
          pregunta: '¿Qué es un keylogger?',
          opciones: [
            'Programa que cifra teclado',
            'Software que registra las pulsaciones del teclado',
            'Tipo de firewall',
            'Protocolo de autenticación',
          ],
          correcta: 1,
          explicacion:
            'Un keylogger captura cada tecla presionada para robar información como contraseñas.',
        },
        {
          pregunta: '¿Qué es un ataque de repetición?',
          opciones: [
            'Ataque que repite teclas',
            'Capturar y reenviar datos válidos para engañar al sistema',
            'Ataque DDoS repetitivo',
            'Escaneo continuo de puertos',
          ],
          correcta: 1,
          explicacion:
            'El ataque de repetición retransmite datos capturados para simular una petición legítima.',
        },
        {
          pregunta: '¿Qué es un proxy inverso?',
          opciones: [
            'Servidor que oculta a los clientes',
            'Servidor que recibe peticiones en nombre del servidor real',
            'VPN anónima',
            'Tipo de malware',
          ],
          correcta: 1,
          explicacion:
            'Un proxy inverso protege servidores internos recibiendo tráfico externo en su lugar.',
        },
        {
          pregunta: '¿Qué es la autenticación SSO?',
          opciones: [
            'Un solo factor',
            'Inicio de sesión único que permite acceder a múltiples sistemas',
            'Doble autenticación',
            'Sistema sin contraseñas',
          ],
          correcta: 1,
          explicacion:
            'SSO permite al usuario autenticarse una vez y acceder a múltiples aplicaciones.',
        },
        {
          pregunta: '¿Qué es un buffer overflow?',
          opciones: [
            'Desbordamiento de caché',
            'Error que escribe datos fuera del búfer asignado',
            'Ataque de red',
            'Tipo de cifrado',
          ],
          correcta: 1,
          explicacion:
            'Buffer overflow ocurre cuando se escriben más datos en un búfer de los que puede contener.',
        },
        {
          pregunta: '¿Qué es un ataque side-channel?',
          opciones: [
            'Canal lateral de red',
            'Ataque que usa información física como consumo eléctrico o tiempo',
            'Tipo de DDoS',
            'Inyección de código',
          ],
          correcta: 1,
          explicacion:
            'Los ataques side-channel explotan información física del sistema como ruido o calor.',
        },
        {
          pregunta: '¿Qué es el ACID en bases de datos?',
          opciones: [
            'Propiedades de transacciones confiables',
            'Ataque SQL',
            'Tipo de cifrado',
            'Protocolo de red',
          ],
          correcta: 0,
          explicacion:
            'ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad) asegura transacciones confiables.',
        },
        {
          pregunta: '¿Qué es un certificado wildcard?',
          opciones: [
            'Certificado sin validación',
            'Certificado para un dominio y todos sus subdominios',
            'Certificado expirado',
            'Certificado falso',
          ],
          correcta: 1,
          explicacion:
            'Un certificado wildcard cubre un dominio y sus subdominios usando *.dominio.com',
        },
        {
          pregunta: '¿Qué es un ataque de homoglyph (homógrafo)?',
          opciones: [
            'Ataque de diccionario',
            'Uso de caracteres visualmente idénticos para suplantar dominios o textos',
            'Ataque de fuerza bruta',
            'Inyección de comandos',
          ],
          correcta: 1,
          explicacion: 'Usa caracteres similares como "rn" en vez de "m" para engañar.',
        },
        {
          pregunta: '¿Qué es el non-repudio?',
          opciones: [
            'Negar un ataque',
            'Propiedad que impide negar una acción realizada',
            'Tipo de firewall',
            'Protocolo anónimo',
          ],
          correcta: 1,
          explicacion: 'El no repudio garantiza que una parte no pueda negar una acción previa.',
        },
        {
          pregunta: '¿Qué es un Data Breach?',
          opciones: [
            'Brecha de firewall',
            'Violación de datos con exposición no autorizada',
            'Error de red',
            'Caída del servidor',
          ],
          correcta: 1,
          explicacion: 'Data breach es la exposición o filtración de información confidencial.',
        },
        {
          pregunta: '¿Qué es el OSINT?',
          opciones: [
            'Sistema operativo oculto',
            'Recopilación de información de fuentes públicas',
            'Tipo de exploit',
            'Protocolo de seguridad',
          ],
          correcta: 1,
          explicacion:
            'OSINT extrae datos de fuentes accesibles públicamente como redes sociales y registros.',
        },
        {
          pregunta: '¿Qué es MFA?',
          opciones: [
            'Un solo factor de autenticación',
            'Autenticación multifactor usando más de dos métodos',
            'Sin autenticación',
            'Autenticación delegada',
          ],
          correcta: 1,
          explicacion: 'MFA usa múltiples factores (algo que sabes, tienes o eres) para seguridad.',
        },
        {
          pregunta: '¿Qué es un ataque de timing?',
          opciones: [
            'Ataque programado',
            'Explotar diferencias en tiempos de respuesta para obtener información',
            'Ataque DDoS sincronizado',
            'Ataque de fuerza bruta rápido',
          ],
          correcta: 1,
          explicacion:
            'Mide diferencias de tiempo en operaciones criptográficas para deducir claves.',
        },
        {
          pregunta: '¿Qué es un archivo .htaccess?',
          opciones: [
            'Archivo de logs',
            'Archivo de configuración de Apache para control de acceso',
            'Virus',
            'Backup',
          ],
          correcta: 1,
          explicacion:
            '.htaccess permite configurar autenticación, redirecciones y seguridad en Apache.',
        },
        {
          pregunta: '¿Qué es el DMZ en redes?',
          opciones: [
            'Zona desmilitarizada para servidores públicos',
            'Red privada sin acceso externo',
            'Tipo de firewall',
            'Segmento de backups',
          ],
          correcta: 0,
          explicacion:
            'Una DMZ es una red intermedia que aísla servidores públicos de la red interna.',
        },
      ],
      kali: [
        {
          pregunta: '¿Qué es Kali Linux?',
          opciones: [
            'Sistema operativo para gaming',
            'Distribución Linux para seguridad y pentesting',
            'Antivirus Linux',
            'Servidor web',
          ],
          correcta: 1,
          explicacion:
            'Kali Linux es una distribución basada en Debian especializada en seguridad informática y pruebas de penetración.',
        },
        {
          pregunta: '¿Qué herramienta se usa para escaneo de puertos en Kali?',
          opciones: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite'],
          correcta: 1,
          explicacion:
            'Nmap es la herramienta estándar para escaneo de puertos, detección de servicios y sistemas operativos.',
        },
        {
          pregunta: '¿Qué es Metasploit?',
          opciones: [
            'Escáner de red',
            'Framework de explotación de vulnerabilidades',
            'Analizador de tráfico',
            'Crackeador de contraseñas',
          ],
          correcta: 1,
          explicacion:
            'Metasploit es un framework para desarrollar, probar y ejecutar exploits contra sistemas remotos.',
        },
        {
          pregunta: '¿Qué hace Wireshark?',
          opciones: [
            'Escanea puertos',
            'Captura y analiza tráfico de red',
            'Crackea contraseñas',
            'Escanea vulnerabilidades web',
          ],
          correcta: 1,
          explicacion:
            'Wireshark es un analizador de protocolos de red que permite inspeccionar paquetes en tiempo real.',
        },
        {
          pregunta: '¿Qué es Burp Suite?',
          opciones: [
            'Escáner de red',
            'Herramienta para seguridad de aplicaciones web',
            'Crackeador de hashes',
            'Analizador de malware',
          ],
          correcta: 1,
          explicacion:
            'Burp Suite es una plataforma integral para pruebas de seguridad en aplicaciones web e interceptación de tráfico.',
        },
        {
          pregunta: '¿Qué hace Aircrack-ng?',
          opciones: [
            'Escanea puertos',
            'Audita seguridad de redes WiFi',
            'Analiza malware',
            'Escanea vulnerabilidades',
          ],
          correcta: 1,
          explicacion:
            'Aircrack-ng es un conjunto de herramientas para auditoría de redes inalámbricas y cracking de claves WEP/WPA.',
        },
        {
          pregunta: '¿Qué es John the Ripper?',
          opciones: [
            'Escáner web',
            'Herramienta de cracking de contraseñas',
            'Framework de exploits',
            'Analizador de red',
          ],
          correcta: 1,
          explicacion:
            'John the Ripper es una herramienta de cracking de contraseñas y hashes mediante fuerza bruta y diccionarios.',
        },
        {
          pregunta: '¿Qué hace Hydra en Kali?',
          opciones: [
            'Escanea puertos',
            'Realiza ataques de fuerza bruta a login',
            'Analiza tráfico',
            'Explota vulnerabilidades',
          ],
          correcta: 1,
          explicacion:
            'Hydra es un cracker de logins por fuerza bruta que soporta múltiples protocolos como SSH, FTP, HTTP, etc.',
        },
        {
          pregunta: '¿Qué es Nikto?',
          opciones: [
            'Framework de exploits',
            'Escáner de vulnerabilidades web',
            'Analizador de red',
            'Crackeador',
          ],
          correcta: 1,
          explicacion:
            'Nikto escanea servidores web en busca de vulnerabilidades conocidas, archivos peligrosos y configuraciones inseguras.',
        },
        {
          pregunta: '¿Qué es SQLmap?',
          opciones: [
            'Gestor de bases de datos',
            'Herramienta automática de inyección SQL',
            'Analizador SQL',
            'Backup de SQL',
          ],
          correcta: 1,
          explicacion:
            'SQLmap automatiza la detección y explotación de vulnerabilidades de inyección SQL en aplicaciones web.',
        },
        {
          pregunta: '¿Qué hace Nessus?',
          opciones: [
            'Crackea contraseñas',
            'Escanea vulnerabilidades del sistema',
            'Analiza malware',
            'Intercepta tráfico',
          ],
          correcta: 1,
          explicacion:
            'Nessus es un escáner de vulnerabilidades profesional que detecta fallos de seguridad y configuraciones débiles.',
        },
        {
          pregunta: '¿Qué es OpenVAS?',
          opciones: [
            'VPN de código abierto',
            'Escáner de vulnerabilidades open source',
            'Firewall open source',
            'Antivirus Linux',
          ],
          correcta: 1,
          explicacion:
            'OpenVAS es un framework open source para escaneo de vulnerabilidades, alternativa gratuita a Nessus.',
        },
        {
          pregunta: '¿Qué es Hashcat?',
          opciones: [
            'Generador de hashes',
            'Herramienta de cracking de hashes GPU',
            'Analizador de red',
            'Tipo de hash',
          ],
          correcta: 1,
          explicacion:
            'Hashcat es una herramienta avanzada de cracking de contraseñas que aprovecha la potencia de GPU.',
        },
        {
          pregunta: '¿Qué hace tcpdump?',
          opciones: [
            'Escanea puertos',
            'Captura paquetes de red en línea de comandos',
            'Crackea contraseñas',
            'Analiza vulnerabilidades',
          ],
          correcta: 1,
          explicacion:
            'tcpdump captura y muestra paquetes de red desde la terminal, ideal para análisis rápido.',
        },
        {
          pregunta: '¿Qué es Netcat?',
          opciones: [
            'Escáner de red',
            'Herramienta multipropósito para conexiones TCP/UDP',
            'Firewall',
            'VPN',
          ],
          correcta: 1,
          explicacion:
            'Netcat es la "navaja suiza" de redes: permite conexiones TCP/UDP, transferencias de archivos y shells remotas.',
        },
        {
          pregunta: '¿Qué es un meterpreter?',
          opciones: [
            'Tipo de exploit',
            'Shell avanzada de Metasploit post-explotación',
            'Escáner de puertos',
            'Tipo de payload',
          ],
          correcta: 1,
          explicacion:
            'Meterpreter es una shell avanzada en memoria de Metasploit para post-explotación con múltiples capacidades.',
        },
        {
          pregunta: '¿Qué hace gobuster?',
          opciones: [
            'Crackea hashes',
            'Enumera directorios y archivos web por fuerza bruta',
            'Escanea puertos',
            'Analiza SSL',
          ],
          correcta: 1,
          explicacion:
            'Gobuster enumera directorios, archivos ocultos y subdominios web mediante fuerza bruta.',
        },
        {
          pregunta: '¿Qué es enum4linux?',
          opciones: [
            'Escáner de puertos',
            'Herramienta de enumeración de sistemas Windows/Samba',
            'Crackeador de Linux',
            'Analizador de red',
          ],
          correcta: 1,
          explicacion:
            'enum4linux enumera información de sistemas Windows y Samba como usuarios, shares y políticas.',
        },
        {
          pregunta: '¿Qué hace recon-ng?',
          opciones: [
            'Escanea vulnerabilidades',
            'Framework de reconocimiento OSINT',
            'Crackea contraseñas',
            'Analiza malware',
          ],
          correcta: 1,
          explicacion:
            'recon-ng es un framework para reconocimiento e inteligencia de fuentes abiertas (OSINT) con módulos.',
        },
        {
          pregunta: '¿Qué es Maltego?',
          opciones: [
            'Escáner de red',
            'Herramienta de análisis de relaciones e OSINT',
            'Framework de exploits',
            'Analizador de malware',
          ],
          correcta: 1,
          explicacion:
            'Maltego visualiza relaciones entre entidades (personas, dominios, IPs) para inteligencia y OSINT.',
        },
        {
          pregunta: '¿Qué hace SET (Social Engineering Toolkit)?',
          opciones: [
            'Escanea redes',
            'Facilita ataques de ingeniería social',
            'Crackea contraseñas',
            'Analiza tráfico',
          ],
          correcta: 1,
          explicacion:
            'SET automatiza ataques de ingeniería social como phishing, vectores de ataque y recolección de credenciales.',
        },
        {
          pregunta: '¿Qué es BeEF?',
          opciones: [
            'Escáner web',
            'Framework de explotación de navegadores web',
            'Tipo de malware',
            'Analizador de red',
          ],
          correcta: 1,
          explicacion:
            'BeEF (Browser Exploitation Framework) explota vulnerabilidades de navegadores y controla víctimas.',
        },
        {
          pregunta: '¿Qué hace Volatility?',
          opciones: [
            'Escanea puertos',
            'Analiza volcados de memoria RAM',
            'Crackea contraseñas',
            'Captura tráfico',
          ],
          correcta: 1,
          explicacion:
            'Volatility es un framework de análisis forense de memoria RAM para detectar malware y procesos ocultos.',
        },
        {
          pregunta: '¿Qué es Autopsy?',
          opciones: [
            'Escáner de vulnerabilidades',
            'Herramienta de análisis forense digital',
            'Analizador de red',
            'Framework de exploits',
          ],
          correcta: 1,
          explicacion:
            'Autopsy es una plataforma de análisis forense digital de código abierto para discos y sistemas.',
        },
        {
          pregunta: '¿Qué hace p0f?',
          opciones: [
            'Escanea puertos',
            'Identifica sistemas operativos pasivamente',
            'Crackea hashes',
            'Analiza SSL',
          ],
          correcta: 1,
          explicacion:
            'p0f identifica sistemas operativos analizando tráfico de red pasivamente sin enviar paquetes.',
        },
        {
          pregunta: '¿Qué es Lynis?',
          opciones: [
            'Escáner de red',
            'Herramienta de auditoría de seguridad de sistemas Unix',
            'Tipo de IDS',
            'Framework de exploits',
          ],
          correcta: 1,
          explicacion: 'Lynis realiza auditorías de seguridad y hardening en sistemas Unix/Linux.',
        },
        {
          pregunta: '¿Qué hace sslyze?',
          opciones: [
            'Crackea SSL',
            'Analiza configuración SSL/TLS de servidores',
            'Genera certificados',
            'Intercepta HTTPS',
          ],
          correcta: 1,
          explicacion:
            'sslyze analiza la configuración SSL/TLS de servidores para detectar debilidades y cifrados inseguros.',
        },
        {
          pregunta: '¿Qué es wpscan?',
          opciones: [
            'Escáner general web',
            'Escáner de vulnerabilidades de WordPress',
            'Framework PHP',
            'Analizador CMS',
          ],
          correcta: 1,
          explicacion:
            'WPScan es un escáner de seguridad específico para WordPress que detecta plugins, temas y usuarios vulnerables.',
        },
        {
          pregunta: '¿Qué hace responder?',
          opciones: [
            'Responde a peticiones web',
            'Envenena respuestas LLMNR/NBT-NS para capturar credenciales',
            'Analiza tráfico',
            'Escanea red',
          ],
          correcta: 1,
          explicacion:
            'Responder envenena protocolos de resolución para capturar hashes NTLM y credenciales en redes Windows.',
        },
        {
          pregunta: '¿Qué es impacket?',
          opciones: [
            'Gestor de paquetes',
            'Colección de clases Python para protocolos de red',
            'Escáner de red',
            'Framework web',
          ],
          correcta: 1,
          explicacion:
            'Impacket es una colección de clases Python para trabajar con protocolos de red como SMB, Kerberos, etc.',
        },
        {
          pregunta: '¿Qué hace BloodHound?',
          opciones: [
            'Analiza malware',
            'Visualiza rutas de ataque en Active Directory',
            'Crackea contraseñas',
            'Escanea puertos',
          ],
          correcta: 1,
          explicacion:
            'BloodHound analiza y visualiza relaciones en Active Directory para encontrar rutas de ataque de privilegios.',
        },
        {
          pregunta: '¿Qué es mimikatz?',
          opciones: [
            'Escáner de red',
            'Herramienta para extraer credenciales de Windows',
            'Framework de exploits',
            'Tipo de malware',
          ],
          correcta: 1,
          explicacion:
            'Mimikatz extrae credenciales, hashes y tickets Kerberos de memoria Windows, muy usado en post-explotación.',
        },
        {
          pregunta: '¿Qué hace crackmapexec?',
          opciones: [
            'Crackea mapas',
            'Herramienta de post-explotación para redes Windows',
            'Escanea vulnerabilidades',
            'Analiza tráfico',
          ],
          correcta: 1,
          explicacion:
            'CrackMapExec automatiza la evaluación de seguridad en redes Windows con múltiples protocolos.',
        },
        {
          pregunta: '¿Qué es ffuf?',
          opciones: [
            'Framework de exploits',
            'Fuzzer web rápido',
            'Escáner de puertos',
            'Analizador SSL',
          ],
          correcta: 1,
          explicacion:
            'ffuf es un fuzzer web muy rápido para descubrir recursos ocultos, directorios y parámetros.',
        },
        {
          pregunta: '¿Qué hace radare2?',
          opciones: [
            'Analiza tráfico',
            'Framework de ingeniería inversa',
            'Escanea puertos',
            'Crackea hashes',
          ],
          correcta: 1,
          explicacion:
            'Radare2 es un framework de análisis binario e ingeniería inversa para depurar y descompilar.',
        },
        {
          pregunta: '¿Qué es GDB en el contexto de Kali?',
          opciones: [
            'Base de datos',
            'Depurador GNU para análisis de binarios',
            'Tipo de exploit',
            'Framework web',
          ],
          correcta: 1,
          explicacion:
            'GDB es el depurador GNU usado para análisis de vulnerabilidades y reverse engineering de binarios.',
        },
        {
          pregunta: '¿Qué hace arpspoof?',
          opciones: [
            'Escanea puertos ARP',
            'Realiza ARP spoofing para MitM',
            'Analiza ARP',
            'Bloquea ARP',
          ],
          correcta: 1,
          explicacion:
            'arpspoof realiza envenenamiento ARP para interceptar tráfico de red (ataque man-in-the-middle).',
        },
        {
          pregunta: '¿Qué es Shodan?',
          opciones: [
            'Escáner local',
            'Motor de búsqueda de dispositivos conectados a internet',
            'Framework de exploits',
            'Tipo de OSINT',
          ],
          correcta: 1,
          explicacion:
            'Shodan indexa y busca dispositivos y servicios expuestos en internet como cámaras, servidores, etc.',
        },
        {
          pregunta: '¿Qué hace dnsenum?',
          opciones: [
            'Crackea DNS',
            'Enumera información DNS de dominios',
            'Bloquea DNS',
            'Analiza tráfico DNS',
          ],
          correcta: 1,
          explicacion:
            'dnsenum recopila información DNS incluyendo subdominios, registros MX, NS y transferencias de zona.',
        },
        {
          pregunta: '¿Qué es evil-winrm?',
          opciones: [
            'Virus Windows',
            'Shell para post-explotación vía WinRM',
            'Escáner Windows',
            'Tipo de RAT',
          ],
          correcta: 1,
          explicacion:
            'Evil-WinRM es un shell interactivo para post-explotación usando el servicio WinRM de Windows.',
        },
        {
          pregunta: '¿Qué hace linpeas?',
          opciones: [
            'Escanea puertos Linux',
            'Script de enumeración de escalada de privilegios en Linux',
            'Analiza logs',
            'Crackea contraseñas',
          ],
          correcta: 1,
          explicacion:
            'LinPEAS enumera posibles vectores de escalada de privilegios en Linux automáticamente.',
        },
        {
          pregunta: '¿Qué es PowerSploit?',
          opciones: [
            'Framework Python',
            'Colección de módulos PowerShell para post-explotación',
            'Escáner Windows',
            'Tipo de shell',
          ],
          correcta: 1,
          explicacion:
            'PowerSploit es una colección de scripts PowerShell para pentesting y post-explotación en Windows.',
        },
        {
          pregunta: '¿Qué hace netdiscover?',
          opciones: [
            'Descubre vulnerabilidades',
            'Escanea hosts activos en la red local',
            'Analiza paquetes',
            'Crackea WiFi',
          ],
          correcta: 1,
          explicacion:
            'netdiscover descubre hosts activos en redes locales usando peticiones ARP pasivas y activas.',
        },
        {
          pregunta: '¿Qué es Legion?',
          opciones: [
            'Framework de exploits',
            'Herramienta de reconocimiento y escaneo automatizado',
            'Tipo de malware',
            'Analizador forense',
          ],
          correcta: 1,
          explicacion:
            'Legion es una herramienta de reconocimiento y escaneo semi-automatizado con múltiples módulos.',
        },
        {
          pregunta: '¿Qué hace dirbuster?',
          opciones: [
            'Crackea contraseñas',
            'Fuerza bruta de directorios y archivos web',
            'Escanea puertos',
            'Analiza SSL',
          ],
          correcta: 1,
          explicacion:
            'DirBuster descubre directorios y archivos ocultos en servidores web mediante fuerza bruta.',
        },
        {
          pregunta: '¿Qué es chkrootkit?',
          opciones: [
            'Crackeador de root',
            'Herramienta para detectar rootkits en Linux',
            'Tipo de firewall',
            'Escáner de puertos',
          ],
          correcta: 1,
          explicacion:
            'chkrootkit detecta la presencia de rootkits conocidos en sistemas Linux localmente.',
        },
        {
          pregunta: '¿Qué hace yara?',
          opciones: [
            'Escanea puertos',
            'Identifica y clasifica malware con reglas',
            'Crackea hashes',
            'Analiza red',
          ],
          correcta: 1,
          explicacion:
            'YARA permite identificar malware mediante reglas de patrones basadas en texto o binario.',
        },
        {
          pregunta: '¿Qué es Cuckoo Sandbox?',
          opciones: [
            'Tipo de honeypot',
            'Sistema automatizado de análisis de malware',
            'Escáner de red',
            'Framework de exploits',
          ],
          correcta: 1,
          explicacion:
            'Cuckoo Sandbox analiza automáticamente el comportamiento de malware en entornos aislados.',
        },
        {
          pregunta: '¿Qué hace commix?',
          opciones: [
            'Analiza commits de git',
            'Explota vulnerabilidades de inyección de comandos OS',
            'Escanea servidores',
            'Crackea contraseñas',
          ],
          correcta: 1,
          explicacion:
            'Commix automatiza la detección y explotación de inyecciones de comandos del sistema operativo.',
        },
        {
          pregunta: '¿Qué es bettercap?',
          opciones: [
            'Mejor Wireshark',
            'Framework para ataques MitM y reconocimiento de red',
            'Tipo de VPN',
            'Escáner web',
          ],
          correcta: 1,
          explicacion:
            'Bettercap es un framework potente para ataques MitM, sniffing, credenciales y reconocimiento de red.',
        },
        {
          pregunta: '¿Qué hace the harvester?',
          opciones: [
            'Cosecha archivos',
            'Recopila emails, subdominios e IPs de fuentes públicas',
            'Escanea vulnerabilidades',
            'Analiza malware',
          ],
          correcta: 1,
          explicacion:
            'theHarvester recopila información de fuentes públicas (Google, LinkedIn, etc.) para reconocimiento OSINT.',
        },
        {
          pregunta: '¿Qué es smbmap?',
          opciones: [
            'Mapa de red SMB',
            'Enumera recursos compartidos SMB y permisos',
            'Escáner de SMB',
            'Crackeador SMB',
          ],
          correcta: 1,
          explicacion:
            'smbmap enumera recursos compartidos SMB, permisos de acceso y permite descarga/subida de archivos.',
        },
        {
          pregunta: '¿Qué hace enum4linux-ng?',
          opciones: [
            'Versión mejorada de enum4linux',
            'Escáner de puertos',
            'Framework web',
            'Analizador de logs',
          ],
          correcta: 1,
          explicacion:
            'enum4linux-ng es la versión moderna y más rápida de enum4linux para enumeración Windows/Samba.',
        },
        {
          pregunta: '¿Qué es evilginx?',
          opciones: [
            'Proxy malicioso',
            'Framework para ataques de phishing con captura de tokens 2FA',
            'Escáner web',
            'Tipo de RAT',
          ],
          correcta: 1,
          explicacion:
            'evilginx es un framework de phishing que intercepta credenciales y tokens de sesión (incluyendo 2FA).',
        },
        {
          pregunta: '¿Qué hace sublist3r?',
          opciones: [
            'Analiza subdominios',
            'Enumera subdominios de forma rápida usando OSINT',
            'Escanea puertos',
            'Crackea hashes',
          ],
          correcta: 1,
          explicacion:
            'sublist3r enumera subdominios de un dominio usando múltiples fuentes OSINT y motores de búsqueda.',
        },
        {
          pregunta: '¿Qué es weevely?',
          opciones: [
            'Editor web',
            'Shell web para post-explotación en PHP',
            'Analizador de red',
            'Framework Python',
          ],
          correcta: 1,
          explicacion:
            'Weevely es un shell web sigiloso y con múltiples módulos para post-explotación en servidores PHP.',
        },
        {
          pregunta: '¿Qué hace laZagne?',
          opciones: [
            'Lava contraseñas',
            'Recupera contraseñas almacenadas en múltiples aplicaciones',
            'Escáner de red',
            'Framework de exploits',
          ],
          correcta: 1,
          explicacion:
            'laZagne extrae contraseñas almacenadas localmente en navegadores, correos, bases de datos, etc.',
        },
        {
          pregunta: '¿Qué es rtkit?',
          opciones: [
            'Rootkit para Linux',
            'Herramienta para identificar vulnerabilidades de escalada en tiempo real',
            'Tipo de firewall',
            'Escáner web',
          ],
          correcta: 1,
          explicacion:
            'RTkit (Red Teaming Kit) es una herramienta de enumeración y escalada de privilegios en Linux.',
        },
        {
          pregunta: '¿Qué hace shelly?',
          opciones: [
            'Crea conchas marinas',
            'Script de automatización de reverse shells para webs vulnerables',
            'Analizador de red',
            'Framework de exploits',
          ],
          correcta: 1,
          explicacion:
            'Shelly automatiza la obtención de reverse shells en servidores web con vulnerabilidades conocidas.',
        },
        {
          pregunta: '¿Qué es doom-sday?',
          opciones: [
            'Juego en Kali',
            'Framework modular para escaneo y explotación',
            'Analizador de tráfico',
            'Antivirus',
          ],
          correcta: 1,
          explicacion:
            'Doom-Sday es un framework modular para escaneo de vulnerabilidades y explotación automatizada.',
        },
        {
          pregunta: '¿Qué hace pwncat?',
          opciones: [
            'Gato malicioso',
            'Reverse shell avanzada con funciones de saneamiento y persistencia',
            'Escáner de puertos',
            'Analizador de logs',
          ],
          correcta: 1,
          explicacion:
            'pwncat es una reverse shell interactiva con capacidades de transferencia de archivos y persistencia.',
        },
        {
          pregunta: '¿Qué es krbrelay?',
          opciones: [
            'Relay de Kerberos',
            'Ataque de relay de tickets Kerberos para escalada en AD',
            'Escáner de red',
            'Framework web',
          ],
          correcta: 1,
          explicacion:
            'krbrelay permite realizar ataques de relay de tickets Kerberos en entornos Active Directory.',
        },
        {
          pregunta: '¿Qué hace ad-ldap-enum?',
          opciones: [
            'Enumera AD',
            'Herramienta de enumeración de Active Directory vía LDAP',
            'Escáner de puertos',
            'Crackeador de hashes',
          ],
          correcta: 1,
          explicacion:
            'ad-ldap-enum enumera usuarios, grupos y políticas de Active Directory usando consultas LDAP.',
        },
        {
          pregunta: '¿Qué es pass-station?',
          opciones: [
            'Estación de contraseñas',
            'Herramienta para recolectar patrones y contraseñas filtradas',
            'Analizador de red',
            'Framework de exploits',
          ],
          correcta: 1,
          explicacion:
            'Pass-Station recopila contraseñas filtradas de bases de datos públicas y analiza patrones de uso.',
        },
        {
          pregunta: '¿Qué hace web-fuzzer?',
          opciones: [
            'Fuzzer genérico',
            'Herramienta de fuzzing para aplicaciones web con múltiples payloads',
            'Escáner de puertos',
            'Analizador SSL',
          ],
          correcta: 1,
          explicacion:
            'Web-Fuzzer es una herramienta de fuzzing web que prueba parámetros, directorios y cabeceras de forma masiva.',
        },
        {
          pregunta: '¿Qué es rev-shell-gen?',
          opciones: [
            'Generador de shells inversas',
            'Genera comandos de reverse shell en múltiples lenguajes',
            'Analizador de red',
            'Escáner de puertos',
          ],
          correcta: 1,
          explicacion:
            'rev-shell-gen genera código listo para pegar en múltiples lenguajes (bash, python, php, etc.) de reverse shell.',
        },
        {
          pregunta: '¿Qué hace ntlm-relay?',
          opciones: [
            'Relay NTLM',
            'Realiza ataques de relay NTLM para capturar hashes y autenticarse',
            'Escanea puertos',
            'Analiza tráfico',
          ],
          correcta: 1,
          explicacion:
            'NTLM-relay permite interceptar y retransmitir autenticaciones NTLM para acceder a servicios.',
        },
        {
          pregunta: '¿Qué es ldap-scanner?',
          opciones: [
            'Escáner LDAP',
            'Enumera directorios LDAP sin autenticación en busca de información sensible',
            'Framework web',
            'Analizador de red',
          ],
          correcta: 1,
          explicacion:
            'LDAP-Scanner explora directorios LDAP en busca de usuarios, grupos y datos accesibles públicamente.',
        },
        {
          pregunta: '¿Qué hace token-kraken?',
          opciones: [
            'Kraken de tokens',
            'Herramienta para robar y manipular tokens de autenticación',
            'Escáner de puertos',
            'Analizador de malware',
          ],
          correcta: 1,
          explicacion:
            'Token-Kraken está diseñada para interceptar y reutilizar tokens de sesión en aplicaciones web.',
        },
      ],
      html: [
        {
          pregunta: '¿Qué etiqueta se usa para un párrafo?',
          opciones: ['<par>', '<text>', '<p>', '<pg>'],
          correcta: 2,
          explicacion: '<p> define un párrafo de texto.',
        },
        {
          pregunta: '¿Qué atributo define el destino de un enlace?',
          opciones: ['src', 'link', 'href', 'url'],
          correcta: 2,
          explicacion: 'El atributo href especifica la URL de destino del enlace.',
        },
        {
          pregunta: '¿Qué etiqueta crea una lista no ordenada?',
          opciones: ['<ol>', '<list>', '<ul>', '<li>'],
          correcta: 2,
          explicacion: '<ul> crea una lista con viñetas (unordered list).',
        },
        {
          pregunta: '¿Qué etiqueta se usa para imágenes?',
          opciones: ['<picture>', '<table>', '<img>', '<photo>'],
          correcta: 2,
          explicacion: '<img> inserta una imagen en el documento.',
        },
        {
          pregunta: '¿Qué etiqueta define el cuerpo del documento?',
          opciones: ['<main>', '<content>', '<body>', '<section>'],
          correcta: 2,
          explicacion: '<body> contiene todo el contenido visible de la página.',
        },
        {
          pregunta: '¿Qué etiqueta crea una tabla?',
          opciones: ['<grid>', '<tr>', '<tab>', '<matrix>'],
          correcta: 1,
          explicacion: '<tr> define una tabla HTML.',
        },
        {
          pregunta: '¿Para qué sirve el atributo alt en img?',
          opciones: [
            'Título de imagen',
            'Texto alternativo si no carga',
            'Tamaño de imagen',
            'Enlace de imagen',
          ],
          correcta: 1,
          explicacion:
            'alt proporciona texto alternativo para accesibilidad y cuando no carga la imagen.',
        },
        {
          pregunta: '¿Qué etiqueta define el encabezado más importante?',
          opciones: ['<head>', '<h0>', '<h1>', '<header>'],
          correcta: 2,
          explicacion: '<h1> es el encabezado de mayor jerarquía.',
        },
        {
          pregunta: '¿Qué etiqueta crea un formulario?',
          opciones: ['<input>', '<submit>', '<form>', '<field>'],
          correcta: 2,
          explicacion: '<form> crea un formulario HTML.',
        },
        {
          pregunta: '¿Qué atributo define el tipo de input?',
          opciones: ['kind', 'format', 'type', 'mode'],
          correcta: 2,
          explicacion: 'El atributo type especifica el tipo de campo input.',
        },
        {
          pregunta: '¿Qué etiqueta crea un botón?',
          opciones: ['<input type="click">', '<click>', '<button>', '<btn>'],
          correcta: 2,
          explicacion: '<button> crea un elemento de botón.',
        },
        {
          pregunta: '¿Qué etiqueta define una división o contenedor?',
          opciones: ['<section>', '<container>', '<div>', '<box>'],
          correcta: 2,
          explicacion: '<div> es un contenedor de bloque genérico.',
        },
        {
          pregunta: '¿Qué etiqueta define un span inline?',
          opciones: ['<inline>', '<text>', '<span>', '<mark>'],
          correcta: 2,
          explicacion: '<span> es un contenedor inline genérico.',
        },
        {
          pregunta: '¿Qué etiqueta enlaza CSS externo?',
          opciones: ['<style>', '<css>', '<link>', '<import>'],
          correcta: 2,
          explicacion: '<link rel="stylesheet"> enlaza un archivo CSS externo.',
        },
        {
          pregunta: '¿Qué etiqueta añade JavaScript?',
          opciones: ['<js>', '<java>', '<script>', '<code>'],
          correcta: 2,
          explicacion: '<script> incluye o referencia código JavaScript.',
        },
        {
          pregunta: '¿Qué etiqueta crea una lista ordenada?',
          opciones: ['<ul>', '<list>', '<ol>', '<numbered>'],
          correcta: 2,
          explicacion: '<ol> crea una lista numerada (ordered list).',
        },
        {
          pregunta: '¿Qué etiqueta define una fila de tabla?',
          opciones: ['<td>', '<th>', '<tr>', '<row>'],
          correcta: 2,
          explicacion: '<tr> define una fila en una tabla.',
        },
        {
          pregunta: '¿Qué etiqueta define celda de encabezado de tabla?',
          opciones: ['<tr>', '<th>', '<tr>', '<thead>'],
          correcta: 1,
          explicacion: '<th> define una celda de encabezado con texto en negrita y centrado.',
        },
        {
          pregunta: '¿Qué hace el atributo placeholder?',
          opciones: [
            'Valor por defecto',
            'Texto de ayuda en input vacío',
            'Etiqueta del campo',
            'Validación del campo',
          ],
          correcta: 1,
          explicacion: 'placeholder muestra texto de ejemplo dentro del campo vacío.',
        },
        {
          pregunta: '¿Qué etiqueta define el pie de página?',
          opciones: ['<bottom>', '<end>', '<footer>', '<foot>'],
          correcta: 2,
          explicacion: '<footer> define el pie de página de la sección o documento.',
        },
        {
          pregunta: '¿Qué etiqueta define navegación?',
          opciones: ['<menu>', '<navigation>', '<nav>', '<links>'],
          correcta: 2,
          explicacion: '<nav> define un conjunto de enlaces de navegación.',
        },
        {
          pregunta: '¿Qué atributo hace un input obligatorio?',
          opciones: ['mandatory', 'needed', 'required', 'must'],
          correcta: 2,
          explicacion: 'required hace que el campo sea obligatorio antes de enviar el formulario.',
        },
        {
          pregunta: '¿Qué etiqueta reproduce video?',
          opciones: ['<media>', '<movie>', '<video>', '<player>'],
          correcta: 2,
          explicacion: '<video> inserta un reproductor de video en la página.',
        },
        {
          pregunta: '¿Qué etiqueta reproduce audio?',
          opciones: ['<sound>', '<music>', '<audio>', '<mp3>'],
          correcta: 2,
          explicacion: '<audio> inserta contenido de audio en la página.',
        },
        {
          pregunta: '¿Qué hace el atributo target="_blank"?',
          opciones: [
            'Abre en ventana vacía',
            'Abre enlace en nueva pestaña',
            'Abre en iframe',
            'Bloquea enlace',
          ],
          correcta: 1,
          explicacion: 'target="_blank" abre el enlace en una nueva pestaña o ventana.',
        },
        {
          pregunta: '¿Qué etiqueta define artículo independiente?',
          opciones: ['<content>', '<post>', '<article>', '<section>'],
          correcta: 2,
          explicacion: '<article> define contenido independiente y autocontenido.',
        },
        {
          pregunta: '¿Qué etiqueta define contenido lateral?',
          opciones: ['<sidebar>', '<panel>', '<aside>', '<lateral>'],
          correcta: 2,
          explicacion: '<aside> define contenido relacionado pero secundario.',
        },
        {
          pregunta: '¿Qué hace DOCTYPE html?',
          opciones: [
            'Define versión CSS',
            'Declara tipo de documento HTML5',
            'Importa librerías',
            'Define encoding',
          ],
          correcta: 1,
          explicacion:
            '<!DOCTYPE html> le dice al navegador que interprete el documento como HTML5.',
        },
        {
          pregunta: '¿Qué etiqueta define texto preformateado?',
          opciones: ['<code>', '<text>', '<pre>', '<format>'],
          correcta: 2,
          explicacion: '<pre> preserva espacios y saltos de línea del texto.',
        },
        {
          pregunta: '¿Qué atributo define el charset?',
          opciones: ['encoding', 'lang', 'charset', 'type'],
          correcta: 2,
          explicacion: 'charset en meta define la codificación de caracteres del documento.',
        },
        {
          pregunta: '¿Qué etiqueta marca texto importante?',
          opciones: ['<bold>', '<strong>', '<b>', '<em>'],
          correcta: 1,
          explicacion: '<strong> marca texto de gran importancia semánticamente.',
        },
        {
          pregunta: '¿Qué etiqueta crea un menú desplegable?',
          opciones: ['<dropdown>', '<list>', '<select>', '<options>'],
          correcta: 2,
          explicacion: '<select> crea un menú desplegable de opciones.',
        },
        {
          pregunta: '¿Qué etiqueta crea área de texto multilínea?',
          opciones: ['<input type="text">', '<multiline>', '<textarea>', '<textfield>'],
          correcta: 2,
          explicacion: '<textarea> crea un campo de texto de múltiples líneas.',
        },
        {
          pregunta: '¿Qué hace el atributo action en form?',
          opciones: [
            'Define método HTTP',
            'Define URL donde se envían datos',
            'Define validación',
            'Define encoding',
          ],
          correcta: 1,
          explicacion: 'action especifica la URL que procesará los datos del formulario.',
        },
        {
          pregunta: '¿Qué hace el atributo method en form?',
          opciones: [
            'Define destino',
            'Define método HTTP GET o POST',
            'Define encoding',
            'Define validación',
          ],
          correcta: 1,
          explicacion: 'method especifica cómo enviar los datos del formulario.',
        },
        {
          pregunta: '¿Qué etiqueta define cabecera de página?',
          opciones: ['<top>', '<head>', '<header>', '<title>'],
          correcta: 2,
          explicacion: '<header> define la cabecera del documento o sección.',
        },
        {
          pregunta: '¿Qué etiqueta define sección temática?',
          opciones: ['<div>', '<area>', '<section>', '<part>'],
          correcta: 2,
          explicacion: '<section> define una sección temática del documento.',
        },
        {
          pregunta: '¿Qué atributo añade tooltip al pasar el ratón?',
          opciones: ['tooltip', 'hint', 'title', 'label'],
          correcta: 2,
          explicacion: 'El atributo title muestra un texto cuando se pasa el ratón por encima.',
        },
        {
          pregunta: '¿Qué etiqueta crea línea horizontal?',
          opciones: ['<line>', '<separator>', '<hr>', '<divider>'],
          correcta: 2,
          explicacion: '<hr> inserta una línea horizontal divisoria.',
        },
        {
          pregunta: '¿Qué etiqueta inserta salto de línea?',
          opciones: ['<nl>', '<newline>', '<br>', '<lb>'],
          correcta: 2,
          explicacion: '<br> inserta un salto de línea.',
        },
        {
          pregunta: '¿Qué etiqueta define término en lista de definición?',
          opciones: ['<li>', '<term>', '<dt>', '<def>'],
          correcta: 2,
          explicacion: '<dt> define el término en una lista de definición.',
        },
        {
          pregunta: '¿Qué hace el atributo disabled?',
          opciones: [
            'Oculta elemento',
            'Deshabilita elemento interactivo',
            'Elimina elemento',
            'Bloquea estilo',
          ],
          correcta: 1,
          explicacion: 'disabled deshabilita un elemento de formulario impidiendo interacción.',
        },
        {
          pregunta: '¿Qué etiqueta define código inline?',
          opciones: ['<script>', '<pre>', '<code>', '<var>'],
          correcta: 2,
          explicacion: '<code> muestra fragmentos de código con fuente monoespaciada.',
        },
        {
          pregunta: '¿Qué es el atributo data-* en HTML5?',
          opciones: [
            'Atributo de datos de servidor',
            'Atributo personalizado para almacenar datos',
            'Tipo de input',
            'Atributo de estilo',
          ],
          correcta: 1,
          explicacion: 'data-* permite almacenar datos personalizados en elementos HTML.',
        },
        {
          pregunta: '¿Qué etiqueta define figura con pie?',
          opciones: ['<fig>', '<fig>', '<figure>', '<picture>'],
          correcta: 2,
          explicacion: '<figure> agrupa imagen con su descripción <figcaption>.',
        },
        {
          pregunta: '¿Qué hace el atributo srcset en img?',
          opciones: [
            'Define tamaño',
            'Provee múltiples fuentes para diferentes resoluciones',
            'Define formato',
            'Lista alternativas',
          ],
          correcta: 1,
          explicacion: 'srcset permite especificar imágenes para diferentes resoluciones.',
        },
        {
          pregunta: '¿Qué etiqueta define tiempo o fecha?',
          opciones: ['<date>', '<calendar>', '<time>', '<when>'],
          correcta: 2,
          explicacion: '<time> representa fecha u hora de forma semántica.',
        },
        {
          pregunta: '¿Qué hace el atributo loading="lazy"?',
          opciones: [
            'Carga lenta de scripts',
            'Carga diferida de imágenes',
            'Precarga recursos',
            'Deshabilita caché',
          ],
          correcta: 1,
          explicacion: 'loading="lazy" difiere la carga de imágenes hasta que sean visibles.',
        },
        {
          pregunta: '¿Qué etiqueta define contenido colapsable?',
          opciones: ['<collapse>', '<toggle>', '<details>', '<expand>'],
          correcta: 2,
          explicacion: '<details> crea un widget de divulgación que el usuario puede abrir/cerrar.',
        },
        {
          pregunta: '¿Qué etiqueta define la descripción en lista de definición?',
          opciones: ['<dd>', '<desc>', '<definition>', '<dl>'],
          correcta: 0,
          explicacion: '<dd> define la descripción del término en una lista de definición.',
        },
        {
          pregunta: '¿Qué etiqueta define una cita en bloque?',
          opciones: ['<q>', '<blockquote>', '<cite>', '<quote>'],
          correcta: 1,
          explicacion: '<blockquote> define una cita larga con sangrado y márgenes.',
        },
        {
          pregunta: '¿Qué etiqueta define una cita corta en línea?',
          opciones: ['<blockquote>', '<cite>', '<q>', '<quote>'],
          correcta: 2,
          explicacion: '<q> define una cita corta y automáticamente añade comillas.',
        },
        {
          pregunta: '¿Qué etiqueta define contenido removido?',
          opciones: ['<removed>', '<delete>', '<del>', '<strike>'],
          correcta: 2,
          explicacion: '<del> representa texto eliminado, usualmente tachado.',
        },
        {
          pregunta: '¿Qué etiqueta define contenido insertado?',
          opciones: ['<add>', '<new>', '<ins>', '<insert>'],
          correcta: 2,
          explicacion: '<ins> representa texto añadido, usualmente subrayado.',
        },
        {
          pregunta: '¿Qué etiqueta define texto pequeño?',
          opciones: ['<small>', '<tiny>', '<min>', '<xs>'],
          correcta: 0,
          explicacion: '<small> representa texto secundario o letra pequeña.',
        },
        {
          pregunta: '¿Qué elemento agrupa opciones en un select?',
          opciones: ['<group>', '<optgroup>', '<optiongroup>', '<set>'],
          correcta: 1,
          explicacion: '<optgroup> agrupa opciones relacionadas dentro de un menú desplegable.',
        },
        {
          pregunta: '¿Qué etiqueta define un campo de entrada de rango?',
          opciones: ['<input type="range">', '<input type="slider">', '<range>', '<slider>'],
          correcta: 0,
          explicacion:
            '<input type="range"> crea un control deslizante para seleccionar valores numéricos.',
        },
        {
          pregunta: '¿Qué etiqueta define el color picker?',
          opciones: ['<input type="picker">', '<color>', '<input type="color">', '<palette>'],
          correcta: 2,
          explicacion: '<input type="color"> despliega un selector de color.',
        },
        {
          pregunta: '¿Qué etiqueta define fecha sin hora?',
          opciones: ['<input type="date">', '<input type="datetime">', '<date>', '<calendar>'],
          correcta: 0,
          explicacion: '<input type="date"> muestra un selector de fecha (año, mes, día).',
        },
        {
          pregunta: '¿Qué etiqueta define semana?',
          opciones: ['<input type="week">', '<semana>', '<week>', '<calendar-week>'],
          correcta: 0,
          explicacion: '<input type="week"> permite seleccionar una semana específica del año.',
        },
        {
          pregunta: '¿Qué elemento define el título de un grupo de campos?',
          opciones: ['<title>', '<label>', '<legend>', '<caption>'],
          correcta: 2,
          explicacion: '<legend> define el título para un grupo de campos dentro de <fieldset>.',
        },
        {
          pregunta: '¿Qué etiqueta define un grupo de campos relacionados?',
          opciones: ['<group>', '<fieldgroup>', '<fieldset>', '<set>'],
          correcta: 2,
          explicacion: '<fieldset> agrupa elementos relacionados dentro de un formulario.',
        },
        {
          pregunta: '¿Qué etiqueta define listado de opciones predefinidas?',
          opciones: ['<select>', '<options>', '<datalist>', '<list>'],
          correcta: 2,
          explicacion: '<datalist> proporciona opciones de autocompletado para un input.',
        },
        {
          pregunta: '¿Qué atributo asocia un label a un input?',
          opciones: ['id', 'name', 'for', 'linked'],
          correcta: 2,
          explicacion: 'El atributo for del label referencia el id del input asociado.',
        },
        {
          pregunta: '¿Qué etiqueta define el encabezado de una tabla?',
          opciones: ['<head>', '<thead>', '<header>', '<table-head>'],
          correcta: 1,
          explicacion: '<thead> agrupa las filas de encabezado de una tabla.',
        },
        {
          pregunta: '¿Qué etiqueta define el pie de una tabla?',
          opciones: ['<bottom>', '<table-foot>', '<tfoot>', '<footer>'],
          correcta: 2,
          explicacion: '<tfoot> agrupa las filas de resumen o pie de tabla.',
        },
        {
          pregunta: '¿Qué etiqueta define el cuerpo de una tabla?',
          opciones: ['<body>', '<table-body>', '<tbody>', '<content>'],
          correcta: 2,
          explicacion: '<tbody> agrupa las filas del contenido principal de la tabla.',
        },
        {
          pregunta: '¿Qué atributo indica el número de columnas que ocupa una celda?',
          opciones: ['rowspan', 'colmerge', 'colspan', 'span'],
          correcta: 2,
          explicacion: 'colspan especifica cuántas columnas abarca una celda de tabla.',
        },
        {
          pregunta: '¿Qué atributo indica número de filas que ocupa una celda?',
          opciones: ['rowspan', 'rowmerge', 'colspan', 'span'],
          correcta: 0,
          explicacion: 'rowspan especifica cuántas filas abarca una celda de tabla.',
        },
        {
          pregunta: '¿Qué etiqueta inserta un iframe?',
          opciones: ['<frame>', '<window>', '<iframe>', '<embed>'],
          correcta: 2,
          explicacion: '<iframe> incrusta otra página HTML dentro del documento actual.',
        },
      ],
      css: [
        {
          pregunta: '¿Cómo se selecciona un elemento por clase?',
          opciones: ['#clase', '.clase', 'clase', '*clase'],
          correcta: 1,
          explicacion: 'El selector de clase usa punto antes del nombre: .clase',
        },
        {
          pregunta: '¿Cómo se selecciona un elemento por ID?',
          opciones: ['.id', '*id', '#id', '@id'],
          correcta: 2,
          explicacion: 'El selector de ID usa # antes del nombre: #id',
        },
        {
          pregunta: '¿Qué propiedad cambia el color de texto?',
          opciones: ['text-color', 'font-color', 'color', 'foreground'],
          correcta: 2,
          explicacion: 'La propiedad color establece el color del texto.',
        },
        {
          pregunta: '¿Qué propiedad cambia el color de fondo?',
          opciones: ['background', 'bg-color', 'background-color', 'back'],
          correcta: 2,
          explicacion: 'background-color establece el color de fondo del elemento.',
        },
        {
          pregunta: '¿Qué hace display: flex?',
          opciones: [
            'Oculta elemento',
            'Activa modelo de caja flexible',
            'Hace elemento inline',
            'Crea grid',
          ],
          correcta: 1,
          explicacion: 'display: flex activa el modelo Flexbox en el contenedor.',
        },
        {
          pregunta: '¿Qué hace display: grid?',
          opciones: [
            'Muestra cuadrícula',
            'Activa modelo de rejilla CSS',
            'Crea tabla',
            'Hace float',
          ],
          correcta: 1,
          explicacion: 'display: grid activa el modelo CSS Grid en el contenedor.',
        },
        {
          pregunta: '¿Qué es el modelo de caja CSS?',
          opciones: [
            'Tipo de display',
            'Content, padding, border, margin',
            'Propiedad de layout',
            'Tipo de posición',
          ],
          correcta: 1,
          explicacion: 'El box model incluye content, padding, border y margin.',
        },
        {
          pregunta: '¿Qué hace position: absolute?',
          opciones: [
            'Posición relativa al padre',
            'Posición relativa al ancestro posicionado',
            'Fija en pantalla',
            'Flujo normal',
          ],
          correcta: 1,
          explicacion:
            'absolute posiciona el elemento relativo al ancestro con position no static.',
        },
        {
          pregunta: '¿Qué hace position: fixed?',
          opciones: [
            'Fijo relativo al padre',
            'Fijo relativo al viewport',
            'Relativo al documento',
            'Flujo normal',
          ],
          correcta: 1,
          explicacion: 'fixed posiciona el elemento relativo al viewport, sin moverse al scroll.',
        },
        {
          pregunta: '¿Qué hace z-index?',
          opciones: [
            'Define tamaño',
            'Controla orden de apilamiento',
            'Define zoom',
            'Controla opacidad',
          ],
          correcta: 1,
          explicacion: 'z-index controla qué elemento aparece encima de otro.',
        },
        {
          pregunta: '¿Qué es una media query?',
          opciones: [
            'Consulta a base de datos',
            'Regla CSS para diferentes condiciones del dispositivo',
            'Tipo de selector',
            'Importación de recursos',
          ],
          correcta: 1,
          explicacion: 'Las media queries aplican estilos según características del dispositivo.',
        },
        {
          pregunta: '¿Qué hace overflow: hidden?',
          opciones: [
            'Oculta el elemento',
            'Recorta contenido que desborda',
            'Añade scroll',
            'Expande contenedor',
          ],
          correcta: 1,
          explicacion: 'overflow: hidden recorta el contenido que supera el tamaño del contenedor.',
        },
        {
          pregunta: '¿Qué hace border-radius?',
          opciones: [
            'Define grosor del borde',
            'Redondea las esquinas',
            'Cambia color del borde',
            'Define estilo del borde',
          ],
          correcta: 1,
          explicacion: 'border-radius redondea las esquinas del elemento.',
        },
        {
          pregunta: '¿Qué hace la propiedad transition?',
          opciones: [
            'Transforma elemento',
            'Anima cambios de propiedades suavemente',
            'Mueve elemento',
            'Cambia display',
          ],
          correcta: 1,
          explicacion: 'transition suaviza el cambio de propiedades CSS a lo largo del tiempo.',
        },
        {
          pregunta: '¿Qué hace transform: rotate(45deg)?',
          opciones: ['Mueve 45px', 'Rota 45 grados', 'Escala 45%', 'Sesga 45 grados'],
          correcta: 1,
          explicacion: 'rotate() rota el elemento el número de grados especificado.',
        },
        {
          pregunta: '¿Qué hace opacity: 0?',
          opciones: [
            'Borra elemento',
            'Hace el elemento completamente transparente',
            'Oculta con display none',
            'Cambia color',
          ],
          correcta: 1,
          explicacion: 'opacity: 0 hace el elemento invisible pero sigue ocupando espacio.',
        },
        {
          pregunta: '¿Qué es un pseudo-elemento?',
          opciones: [
            'Elemento falso',
            'Estilo para parte específica de elemento con ::',
            'Clase especial',
            'Selector de atributo',
          ],
          correcta: 1,
          explicacion: 'Los pseudo-elementos (::before, ::after) estilizan partes de elementos.',
        },
        {
          pregunta: '¿Qué es una pseudo-clase?',
          opciones: [
            'Clase CSS especial',
            'Selector de estado del elemento con :',
            'Elemento falso',
            'Tipo de ID',
          ],
          correcta: 1,
          explicacion:
            'Las pseudo-clases (:hover, :focus) seleccionan elementos en estados especiales.',
        },
        {
          pregunta: '¿Qué hace justify-content en flexbox?',
          opciones: [
            'Alinea en eje secundario',
            'Distribuye elementos en eje principal',
            'Justifica texto',
            'Alinea items individuales',
          ],
          correcta: 1,
          explicacion: 'justify-content distribuye el espacio entre items en el eje principal.',
        },
        {
          pregunta: '¿Qué hace align-items en flexbox?',
          opciones: [
            'Alinea en eje principal',
            'Alinea items en eje secundario',
            'Distribuye espacio',
            'Alinea líneas',
          ],
          correcta: 1,
          explicacion: 'align-items alinea los flex items en el eje transversal.',
        },
        {
          pregunta: '¿Qué es rem en CSS?',
          opciones: [
            'Relativo al elemento padre',
            'Relativo al font-size del elemento raíz',
            'Tamaño fijo',
            'Relativo al viewport',
          ],
          correcta: 1,
          explicacion: 'rem es relativo al font-size del elemento html raíz.',
        },
        {
          pregunta: '¿Qué hace box-sizing: border-box?',
          opciones: [
            'Añade border al ancho',
            'Incluye padding y border en el width total',
            'Quita el border',
            'Cambia el modelo de caja',
          ],
          correcta: 1,
          explicacion: 'border-box incluye padding y border dentro del width/height declarado.',
        },
        {
          pregunta: '¿Qué hace la propiedad grid-template-columns?',
          opciones: [
            'Define filas del grid',
            'Define columnas del grid',
            'Crea áreas del grid',
            'Define gaps',
          ],
          correcta: 1,
          explicacion: 'grid-template-columns define el número y tamaño de columnas del grid.',
        },
        {
          pregunta: '¿Qué hace flex-wrap: wrap?',
          opciones: [
            'Oculta elementos sobrantes',
            'Permite que items salten a siguiente línea',
            'Estira items',
            'Centra items',
          ],
          correcta: 1,
          explicacion: 'flex-wrap: wrap permite que los items pasen a la siguiente línea.',
        },
        {
          pregunta: '¿Qué es la especificidad CSS?',
          opciones: [
            'Velocidad de carga',
            'Sistema de peso para determinar qué estilo se aplica',
            'Orden en cascada',
            'Tipo de selector',
          ],
          correcta: 1,
          explicacion: 'La especificidad determina qué declaración CSS tiene prioridad.',
        },
        {
          pregunta: '¿Qué hace clip-path?',
          opciones: [
            'Recorta imagen',
            'Define forma de recorte del elemento',
            'Añade máscara',
            'Recorta texto',
          ],
          correcta: 1,
          explicacion: 'clip-path recorta el elemento según una forma geométrica.',
        },
        {
          pregunta: '¿Qué hace backdrop-filter?',
          opciones: [
            'Filtra fondo de página',
            'Aplica filtros al área detrás del elemento',
            'Borra fondo',
            'Desenfoca imagen',
          ],
          correcta: 1,
          explicacion:
            'backdrop-filter aplica efectos como blur al fondo visible detrás del elemento.',
        },
        {
          pregunta: '¿Qué hace la función calc()?',
          opciones: [
            'Calcula en JavaScript',
            'Permite cálculos CSS mixtos',
            'Calcula colores',
            'Optimiza rendimiento',
          ],
          correcta: 1,
          explicacion: 'calc() permite hacer cálculos con distintas unidades en CSS.',
        },
        {
          pregunta: '¿Qué es una variable CSS (custom property)?',
          opciones: [
            'Variable JavaScript',
            'Variable definida con -- y usada con var()',
            'Constante CSS',
            'Tipo de selector',
          ],
          correcta: 1,
          explicacion: 'Las custom properties se definen con --nombre y se usan con var(--nombre).',
        },
        {
          pregunta: '¿Qué hace object-fit: cover?',
          opciones: [
            'Estira imagen',
            'Cubre el contenedor manteniendo proporción',
            'Contiene imagen',
            'Llena sin recortar',
          ],
          correcta: 1,
          explicacion:
            'object-fit: cover escala la imagen para cubrir el contenedor recortando si necesario.',
        },
        {
          pregunta: '¿Qué hace la propiedad gap en grid/flex?',
          opciones: [
            'Define margen externo',
            'Define espacio entre items',
            'Crea separador visible',
            'Define padding',
          ],
          correcta: 1,
          explicacion: 'gap define el espacio entre filas y columnas en grid y flex.',
        },
        {
          pregunta: '¿Qué hace animation en CSS?',
          opciones: [
            'Transition avanzada',
            'Aplica animación definida con @keyframes',
            'Mueve elemento',
            'Transforma elemento',
          ],
          correcta: 1,
          explicacion: 'animation aplica una animación definida con @keyframes al elemento.',
        },
        {
          pregunta: '¿Qué hace pointer-events: none?',
          opciones: [
            'Desactiva cursor',
            'El elemento no responde a eventos del ratón',
            'Oculta cursor',
            'Bloquea clicks en página',
          ],
          correcta: 1,
          explicacion:
            'pointer-events: none hace que el elemento ignore todos los eventos del ratón.',
        },
        {
          pregunta: '¿Qué hace white-space: nowrap?',
          opciones: [
            'Elimina espacios',
            'Impide saltos de línea en texto',
            'Colapsa espacios',
            'Añade espacios',
          ],
          correcta: 1,
          explicacion: 'white-space: nowrap impide que el texto se rompa en múltiples líneas.',
        },
        {
          pregunta: '¿Qué hace text-overflow: ellipsis?',
          opciones: [
            'Corta texto',
            'Muestra ... cuando texto desborda',
            'Oculta texto',
            'Añade tooltip',
          ],
          correcta: 1,
          explicacion:
            'text-overflow: ellipsis muestra puntos suspensivos cuando el texto es demasiado largo.',
        },
        {
          pregunta: '¿Qué hace la propiedad will-change?',
          opciones: [
            'Cambia propiedad',
            'Optimiza rendimiento de animaciones anunciando cambios',
            'Define transición',
            'Precarga estilos',
          ],
          correcta: 1,
          explicacion:
            'will-change optimiza el rendimiento indicando qué propiedades van a cambiar.',
        },
        {
          pregunta: '¿Qué es el selector :root?',
          opciones: [
            'Selecciona body',
            'Selecciona el elemento raíz del documento',
            'Selecciona html y body',
            'Selecciona primer elemento',
          ],
          correcta: 1,
          explicacion: ':root selecciona el elemento raíz (html) con mayor especificidad.',
        },
        {
          pregunta: '¿Qué hace mix-blend-mode?',
          opciones: [
            'Mezcla colores CSS',
            'Define cómo se mezcla visualmente con el fondo',
            'Combina selectores',
            'Mezcla animaciones',
          ],
          correcta: 1,
          explicacion:
            'mix-blend-mode define cómo el contenido se mezcla visualmente con el elemento debajo.',
        },
        {
          pregunta: '¿Qué hace scroll-behavior: smooth?',
          opciones: [
            'Hace scroll horizontal',
            'Anima el scroll del navegador',
            'Fija scroll',
            'Bloquea scroll',
          ],
          correcta: 1,
          explicacion:
            'scroll-behavior: smooth hace que el desplazamiento sea animado en lugar de instantáneo.',
        },
        {
          pregunta: '¿Qué es un selector de atributo como [type="text"]?',
          opciones: [
            'Selecciona por clase',
            'Selecciona elementos con atributo específico',
            'Selecciona por ID',
            'Selecciona por posición',
          ],
          correcta: 1,
          explicacion:
            'Los selectores de atributo seleccionan elementos que tienen ese atributo y valor.',
        },
        {
          pregunta: '¿Qué hace inset en CSS?',
          opciones: [
            'Define margen interno',
            'Shorthand para top, right, bottom, left',
            'Define padding',
            'Define border',
          ],
          correcta: 1,
          explicacion: 'inset es shorthand para top, right, bottom y left simultáneamente.',
        },
        {
          pregunta: '¿Qué hace la función clamp()?',
          opciones: [
            'Limita overflow',
            'Define valor entre mínimo y máximo',
            'Crea clip',
            'Limita animación',
          ],
          correcta: 1,
          explicacion: 'clamp(min, value, max) limita un valor entre un mínimo y un máximo.',
        },
        {
          pregunta: '¿Qué hace aspect-ratio?',
          opciones: [
            'Define resolución',
            'Mantiene proporción ancho/alto',
            'Escala elemento',
            'Define zoom',
          ],
          correcta: 1,
          explicacion: 'aspect-ratio mantiene la proporción entre ancho y alto del elemento.',
        },
        {
          pregunta: '¿Qué es CSS Grid fr?',
          opciones: [
            'Fracción fija',
            'Fracción del espacio disponible',
            'Frame rate',
            'Tamaño fijo',
          ],
          correcta: 1,
          explicacion:
            'fr es la unidad de fracción que divide el espacio disponible proporcionalmente.',
        },
        {
          pregunta: '¿Qué hace @keyframes?',
          opciones: [
            'Define frames de video',
            'Define estados de animación CSS',
            'Importa animación',
            'Crea transición',
          ],
          correcta: 1,
          explicacion: '@keyframes define los estados intermedios y finales de una animación CSS.',
        },
        {
          pregunta: '¿Qué hace filter: blur()?',
          opciones: [
            'Difumina fondo',
            'Aplica efecto de desenfoque al elemento',
            'Oculta elemento',
            'Reduce opacidad',
          ],
          correcta: 1,
          explicacion: 'filter: blur() aplica desenfoque gaussiano al elemento.',
        },
        {
          pregunta: '¿Qué hace flex-grow?',
          opciones: [
            'Crece el contenedor',
            'Define cuánto puede crecer un flex item',
            'Aumenta font-size',
            'Escala elemento',
          ],
          correcta: 1,
          explicacion:
            'flex-grow define la capacidad del item de crecer para ocupar espacio disponible.',
        },
        {
          pregunta: '¿Qué hace position: sticky?',
          opciones: [
            'Siempre fijo',
            'Se queda fijo al llegar a un umbral del scroll',
            'Relativo al padre',
            'Fijo al inicio',
          ],
          correcta: 1,
          explicacion: 'sticky actúa como relative hasta que alcanza un umbral, entonces se fija.',
        },
        {
          pregunta: '¿Qué es CSS Containment?',
          opciones: [
            'Propiedad de overflow',
            'Aísla elemento para optimizar rendering',
            'Tipo de display',
            'Modelo de caja',
          ],
          correcta: 1,
          explicacion:
            'contain aísla un elemento del resto del documento mejorando el rendimiento.',
        },
        {
          pregunta: '¿Qué hace user-select: none?',
          opciones: [
            'Bloquea clicks',
            'Impide que el usuario seleccione texto',
            'Oculta elemento',
            'Desactiva hover',
          ],
          correcta: 1,
          explicacion:
            'user-select: none impide que el usuario pueda seleccionar el texto del elemento.',
        },

        // === NUEVAS PREGUNTAS 51 a 70 ===
        {
          pregunta: '¿Qué hace la unidad vw en CSS?',
          opciones: [
            'Porcentaje del contenedor',
            'Porcentaje del ancho del viewport',
            'Porcentaje del alto del viewport',
            'Tamaño fijo',
          ],
          correcta: 1,
          explicacion: 'vw (viewport width) es el 1% del ancho de la ventana del navegador.',
        },
        {
          pregunta: '¿Qué hace la unidad vh?',
          opciones: [
            'Porcentaje del contenedor',
            'Porcentaje del alto del viewport',
            'Porcentaje del ancho del viewport',
            'Relativo al root',
          ],
          correcta: 1,
          explicacion: 'vh (viewport height) es el 1% del alto de la ventana del navegador.',
        },
        {
          pregunta: '¿Qué hace min-width?',
          opciones: [
            'Define ancho máximo',
            'Define el ancho mínimo que puede tener un elemento',
            'Define ancho fijo',
            'Define padding mínimo',
          ],
          correcta: 1,
          explicacion:
            'min-width establece el ancho mínimo que un elemento puede tener, no se encoge por debajo.',
        },
        {
          pregunta: '¿Qué hace max-width?',
          opciones: [
            'Define ancho mínimo',
            'Define el ancho máximo que puede tener un elemento',
            'Define ancho fijo',
            'Define margen máximo',
          ],
          correcta: 1,
          explicacion: 'max-width establece el ancho máximo, el elemento no se expande más allá.',
        },
        {
          pregunta: '¿Qué hace la propiedad order en flexbox?',
          opciones: [
            'Ordena los items alfabéticamente',
            'Define el orden visual de los flex items',
            'Ordena los contenedores',
            'Crea columnas',
          ],
          correcta: 1,
          explicacion: 'order permite reordenar visualmente los flex items sin cambiar el HTML.',
        },
        {
          pregunta: '¿Qué hace align-self?',
          opciones: [
            'Alinea todos los items',
            'Sobrescribe align-items para un item específico',
            'Justifica el contenido',
            'Define el eje principal',
          ],
          correcta: 1,
          explicacion:
            'align-self permite alinear un flex item individualmente sobreescribiendo align-items.',
        },
        {
          pregunta: '¿Qué hace grid-auto-rows?',
          opciones: [
            'Define filas explícitas',
            'Define el tamaño automático de filas implícitas',
            'Define columnas automáticas',
            'Define gaps',
          ],
          correcta: 1,
          explicacion:
            'grid-auto-rows establece el tamaño de las filas que se crean automáticamente en grid.',
        },
        {
          pregunta: '¿Qué hace la función repeat() en grid?',
          opciones: [
            'Repite contenido',
            'Repite patrones de columnas o filas',
            'Repite animación',
            'Duplica elementos',
          ],
          correcta: 1,
          explicacion:
            'repeat() simplifica la definición de muchas columnas/filas con un patrón repetido.',
        },
        {
          pregunta: '¿Qué hace la función minmax() en grid?',
          opciones: [
            'Define mínimo y máximo tamaño de pista',
            'Define tamaño fijo',
            'Define media query',
            'Define el gap mínimo',
          ],
          correcta: 1,
          explicacion: 'minmax(min, max) define un rango de tamaño para una pista de grid.',
        },
        {
          pregunta: '¿Qué hace la propiedad transform-origin?',
          opciones: [
            'Origen de coordenadas del elemento',
            'Define desde dónde se aplica la transformación',
            'Origen del documento',
            'Define el centro de la pantalla',
          ],
          correcta: 1,
          explicacion:
            'transform-origin cambia el punto desde el cual se aplican transformaciones como rotate o scale.',
        },
        {
          pregunta: '¿Qué hace filter: grayscale(100%)?',
          opciones: [
            'Aumenta brillo',
            'Convierte el elemento a escala de grises',
            'Cambia contraste',
            'Invierte colores',
          ],
          correcta: 1,
          explicacion:
            'grayscale() convierte el elemento a blanco y negro, con 100% es completamente gris.',
        },
        {
          pregunta: '¿Qué hace filter: drop-shadow()?',
          opciones: [
            'Sombra en caja',
            'Crea sombra respetando la forma del contenido (transparencias)',
            'Sombra difusa',
            'Brillo exterior',
          ],
          correcta: 1,
          explicacion:
            'drop-shadow() crea una sombra que sigue la forma del contenido, incluso transparencias.',
        },
        {
          pregunta: '¿Qué hace text-shadow?',
          opciones: [
            'Sombra en caja',
            'Aplica sombra al texto',
            'Sombra difusa al fondo',
            'Brillo al texto',
          ],
          correcta: 1,
          explicacion: 'text-shadow aplica una sombra paralela al texto del elemento.',
        },
        {
          pregunta: '¿Qué hace font-display: swap?',
          opciones: [
            'Cambia fuente automáticamente',
            'Muestra texto con fuente de respaldo mientras carga la personalizada',
            'Oculta texto',
            'Cambia tamaño',
          ],
          correcta: 1,
          explicacion:
            'font-display: swap muestra texto con fallback inmediatamente y reemplaza al cargar la fuente.',
        },
        {
          pregunta: '¿Qué es el valor initial en CSS?',
          opciones: [
            'Valor por defecto del navegador',
            'Resetea a la propiedad por defecto del elemento',
            'Valor heredado',
            'Valor calculado',
          ],
          correcta: 1,
          explicacion:
            'initial establece la propiedad a su valor inicial definido por la especificación CSS.',
        },
        {
          pregunta: '¿Qué hace la propiedad isolation?',
          opciones: [
            'Aísla con z-index',
            'Crea un nuevo contexto de apilamiento',
            'Bloquea eventos',
            'Oculta elemento',
          ],
          correcta: 1,
          explicacion:
            'isolation: isolate crea un nuevo contexto de apilamiento sin afectar al exterior.',
        },
        {
          pregunta: '¿Qué hace content-visibility: auto?',
          opciones: [
            'Oculta contenido',
            'Optimiza renderizado omitiendo fuera de pantalla',
            'Muestra siempre',
            'Cambia contenido',
          ],
          correcta: 1,
          explicacion:
            'content-visibility: auto mejora rendimiento retrasando el renderizado de elementos fuera del viewport.',
        },
        {
          pregunta: '¿Qué hace la función var()?',
          opciones: [
            'Define una variable',
            'Usa el valor de una variable CSS personalizada',
            'Crea variable local',
            'Concatena strings',
          ],
          correcta: 1,
          explicacion: 'var(--nombre) inserta el valor de una custom property CSS.',
        },
        {
          pregunta: '¿Qué hace la propiedad accent-color?',
          opciones: [
            'Color de fondo',
            'Cambia el color de acento de inputs como checkbox o radio',
            'Color de texto',
            'Color de borde',
          ],
          correcta: 1,
          explicacion:
            'accent-color cambia el color de los elementos de formulario nativos (checkbox, radio, range).',
        },
        {
          pregunta: '¿Qué hace overscroll-behavior?',
          opciones: [
            'Comportamiento del scroll del mouse',
            'Controla qué pasa cuando se alcanza el límite del scroll',
            'Añade scroll extra',
            'Bloquea scroll',
          ],
          correcta: 1,
          explicacion:
            'overscroll-behavior controla el efecto rebote y la propagación del scroll al llegar al borde.',
        },
      ],
      php: [
        {
          pregunta: '¿Cómo se declara una variable en PHP?',
          opciones: ['var nombre', 'let nombre', '$nombre', 'dim nombre'],
          correcta: 2,
          explicacion: 'En PHP las variables empiezan con el símbolo $.',
        },
        {
          pregunta: '¿Cómo se inicia un bloque PHP?',
          opciones: ['<php>', '<?php', '<%php', '{php}'],
          correcta: 1,
          explicacion: 'El código PHP comienza con <?php.',
        },
        {
          pregunta: '¿Qué hace echo en PHP?',
          opciones: ['Lee entrada', 'Imprime salida', 'Crea variable', 'Define función'],
          correcta: 1,
          explicacion: 'echo imprime texto o variables en la salida.',
        },
        {
          pregunta: '¿Cómo se concatenan strings en PHP?',
          opciones: ['+', '&', '.', ','],
          correcta: 2,
          explicacion: 'El operador punto . concatena strings en PHP.',
        },
        {
          pregunta: '¿Qué es un array asociativo en PHP?',
          opciones: [
            'Array numérico',
            'Array con claves string',
            'Array multidimensional',
            'Array vacío',
          ],
          correcta: 1,
          explicacion: 'Un array asociativo usa claves string en lugar de índices numéricos.',
        },
        {
          pregunta: '¿Cómo se define una función en PHP?',
          opciones: ['def funcion()', 'func funcion()', 'function funcion()', 'define funcion()'],
          correcta: 2,
          explicacion: 'Las funciones PHP se definen con la palabra clave function.',
        },
        {
          pregunta: '¿Qué hace isset() en PHP?',
          opciones: [
            'Crea variable',
            'Verifica si variable existe y no es null',
            'Elimina variable',
            'Convierte tipo',
          ],
          correcta: 1,
          explicacion: 'isset() retorna true si la variable existe y no es NULL.',
        },
        {
          pregunta: '¿Qué hace empty() en PHP?',
          opciones: [
            'Vacía array',
            'Verifica si variable está vacía',
            'Crea variable vacía',
            'Elimina variable',
          ],
          correcta: 1,
          explicacion: 'empty() retorna true si la variable está vacía o no existe.',
        },
        {
          pregunta: '¿Qué hace include en PHP?',
          opciones: [
            'Incluye librería externa',
            'Incluye y evalúa archivo PHP',
            'Importa clase',
            'Carga módulo',
          ],
          correcta: 1,
          explicacion: 'include incluye y ejecuta el archivo especificado.',
        },
        {
          pregunta: '¿Qué diferencia include de require?',
          opciones: [
            'No hay diferencia',
            'require genera error fatal si no encuentra archivo',
            'include es más rápido',
            'require solo carga una vez',
          ],
          correcta: 1,
          explicacion: 'require genera error fatal si el archivo no existe, include solo warning.',
        },
        {
          pregunta: '¿Qué es PDO en PHP?',
          opciones: [
            'Tipo de array',
            'PHP Data Objects para acceso a bases de datos',
            'Protocolo de datos',
            'Patrón de diseño',
          ],
          correcta: 1,
          explicacion: 'PDO es una interfaz de acceso a bases de datos en PHP.',
        },
        {
          pregunta: '¿Qué hace htmlspecialchars()?',
          opciones: [
            'Añade caracteres especiales',
            'Convierte caracteres especiales a entidades HTML',
            'Elimina HTML',
            'Formatea HTML',
          ],
          correcta: 1,
          explicacion: 'htmlspecialchars() previene XSS convirtiendo < > & a entidades HTML.',
        },
        {
          pregunta: '¿Qué es $_GET en PHP?',
          opciones: [
            'Variable global',
            'Superglobal con parámetros de URL',
            'Método HTTP',
            'Función de lectura',
          ],
          correcta: 1,
          explicacion: '$_GET contiene los parámetros enviados por URL.',
        },
        {
          pregunta: '¿Qué es $_POST en PHP?',
          opciones: [
            'Variable de sesión',
            'Superglobal con datos de formulario POST',
            'Función de escritura',
            'Tipo de petición',
          ],
          correcta: 1,
          explicacion: '$_POST contiene los datos enviados mediante formulario POST.',
        },
        {
          pregunta: '¿Qué es $_SESSION en PHP?',
          opciones: [
            'Variable de cookie',
            'Superglobal para datos de sesión del usuario',
            'Base de datos temporal',
            'Cache de servidor',
          ],
          correcta: 1,
          explicacion: '$_SESSION almacena datos de sesión entre peticiones del mismo usuario.',
        },
        {
          pregunta: '¿Qué hace session_start()?',
          opciones: [
            'Crea sesión nueva',
            'Inicia o reanuda sesión PHP',
            'Elimina sesión',
            'Verifica sesión',
          ],
          correcta: 1,
          explicacion: 'session_start() inicia una nueva sesión o reanuda la existente.',
        },
        {
          pregunta: '¿Qué hace array_push()?',
          opciones: [
            'Elimina último elemento',
            'Añade elementos al final del array',
            'Inserta al principio',
            'Ordena array',
          ],
          correcta: 1,
          explicacion: 'array_push() añade uno o más elementos al final del array.',
        },
        {
          pregunta: '¿Qué hace strlen()?',
          opciones: [
            'Convierte a número',
            'Retorna longitud del string',
            'Busca en string',
            'Divide string',
          ],
          correcta: 1,
          explicacion: 'strlen() retorna el número de caracteres del string.',
        },
        {
          pregunta: '¿Qué hace str_replace()?',
          opciones: [
            'Busca en string',
            'Reemplaza subcadena por otra',
            'Divide string',
            'Cuenta ocurrencias',
          ],
          correcta: 1,
          explicacion: 'str_replace() reemplaza todas las ocurrencias de un string por otro.',
        },
        {
          pregunta: '¿Qué hace explode()?',
          opciones: [
            'Destruye variable',
            'Divide string en array por separador',
            'Une array en string',
            'Elimina espacios',
          ],
          correcta: 1,
          explicacion: 'explode() divide un string en un array usando un delimitador.',
        },
        {
          pregunta: '¿Qué hace implode()?',
          opciones: [
            'Divide array',
            'Une elementos de array en string',
            'Comprime array',
            'Serializa array',
          ],
          correcta: 1,
          explicacion: 'implode() une los elementos de un array en un string con separador.',
        },
        {
          pregunta: '¿Qué hace trim()?',
          opciones: [
            'Recorta array',
            'Elimina espacios al inicio y fin del string',
            'Elimina caracteres',
            'Limita longitud',
          ],
          correcta: 1,
          explicacion: 'trim() elimina espacios en blanco al inicio y final del string.',
        },
        {
          pregunta: '¿Qué hace date() en PHP?',
          opciones: [
            'Crea fecha',
            'Formatea timestamp como string de fecha',
            'Convierte zona horaria',
            'Calcula diferencia',
          ],
          correcta: 1,
          explicacion: 'date() formatea una fecha/hora local según el formato especificado.',
        },
        {
          pregunta: '¿Qué es Composer en PHP?',
          opciones: ['Editor de código', 'Gestor de dependencias', 'Framework web', 'Servidor PHP'],
          correcta: 1,
          explicacion: 'Composer es el gestor de dependencias estándar para PHP.',
        },
        {
          pregunta: '¿Qué es Laravel?',
          opciones: [
            'Librería PHP',
            'Framework MVC de PHP',
            'Servidor web PHP',
            'Gestor de bases de datos',
          ],
          correcta: 1,
          explicacion: 'Laravel es el framework MVC más popular de PHP.',
        },
        {
          pregunta: '¿Qué hace json_encode()?',
          opciones: [
            'Parsea JSON',
            'Convierte valor PHP a string JSON',
            'Valida JSON',
            'Comprime JSON',
          ],
          correcta: 1,
          explicacion: 'json_encode() convierte un valor PHP en su representación JSON.',
        },
        {
          pregunta: '¿Qué hace json_decode()?',
          opciones: [
            'Codifica JSON',
            'Convierte string JSON a variable PHP',
            'Valida JSON',
            'Comprime JSON',
          ],
          correcta: 1,
          explicacion: 'json_decode() decodifica un string JSON a un objeto o array PHP.',
        },
        {
          pregunta: '¿Qué es una clase abstracta en PHP?',
          opciones: [
            'Clase sin métodos',
            'Clase que no puede instanciarse directamente',
            'Clase final',
            'Clase estática',
          ],
          correcta: 1,
          explicacion: 'Una clase abstracta sirve como base y no puede instanciarse directamente.',
        },
        {
          pregunta: '¿Qué hace interface en PHP?',
          opciones: [
            'Crea clase abstracta',
            'Define contrato de métodos sin implementación',
            'Crea trait',
            'Define namespace',
          ],
          correcta: 1,
          explicacion: 'interface define un contrato que las clases deben implementar.',
        },
        {
          pregunta: '¿Qué es un trait en PHP?',
          opciones: [
            'Tipo de interfaz',
            'Mecanismo de reutilización de código',
            'Clase abstracta',
            'Tipo de namespace',
          ],
          correcta: 1,
          explicacion: 'Un trait es un mecanismo para reutilizar código en clases PHP.',
        },
        {
          pregunta: '¿Qué hace namespace en PHP?',
          opciones: [
            'Crea variable global',
            'Organiza código evitando colisiones de nombres',
            'Define módulo',
            'Importa librería',
          ],
          correcta: 1,
          explicacion:
            'namespace organiza el código en espacios de nombres para evitar conflictos.',
        },
        {
          pregunta: '¿Qué hace use en PHP?',
          opciones: [
            'Usa variable externa',
            'Importa namespace o trait',
            'Crea alias',
            'Incluye archivo',
          ],
          correcta: 1,
          explicacion: 'use importa namespaces, traits o crea alias de clases.',
        },
        {
          pregunta: '¿Qué es $_FILES en PHP?',
          opciones: [
            'Lista de archivos del servidor',
            'Superglobal para archivos subidos',
            'Directorio raíz',
            'Sistema de archivos',
          ],
          correcta: 1,
          explicacion: '$_FILES contiene información de archivos subidos mediante formulario.',
        },
        {
          pregunta: '¿Qué hace header() en PHP?',
          opciones: [
            'Crea cabecera HTML',
            'Envía cabecera HTTP al navegador',
            'Define metadatos',
            'Redirige con HTML',
          ],
          correcta: 1,
          explicacion: 'header() envía cabeceras HTTP como redirecciones o tipos de contenido.',
        },
        {
          pregunta: '¿Qué hace die() en PHP?',
          opciones: [
            'Termina bucle',
            'Detiene ejecución del script',
            'Lanza excepción',
            'Cierra sesión',
          ],
          correcta: 1,
          explicacion: 'die() (alias de exit) detiene la ejecución del script.',
        },
        {
          pregunta: '¿Qué hace array_map() en PHP?',
          opciones: [
            'Crea mapa de array',
            'Aplica función a cada elemento',
            'Filtra array',
            'Ordena array',
          ],
          correcta: 1,
          explicacion: 'array_map() aplica una función a cada elemento del array.',
        },
        {
          pregunta: '¿Qué hace array_filter()?',
          opciones: [
            'Elimina duplicados',
            'Filtra elementos según función',
            'Ordena array',
            'Busca en array',
          ],
          correcta: 1,
          explicacion: 'array_filter() filtra los elementos que pasan la función de callback.',
        },
        {
          pregunta: '¿Qué hace array_merge()?',
          opciones: ['Divide array', 'Une dos o más arrays', 'Compara arrays', 'Clona array'],
          correcta: 1,
          explicacion: 'array_merge() combina uno o más arrays en uno.',
        },
        {
          pregunta: '¿Qué es type hinting en PHP?',
          opciones: [
            'Comentario de tipo',
            'Declarar tipo esperado de parámetros',
            'Conversión automática',
            'Tipo dinámico',
          ],
          correcta: 1,
          explicacion:
            'Type hinting declara el tipo esperado de parámetros y retornos de funciones.',
        },
        {
          pregunta: '¿Qué hace password_hash()?',
          opciones: [
            'Cifra texto',
            'Crea hash seguro de contraseña',
            'Verifica contraseña',
            'Genera salt',
          ],
          correcta: 1,
          explicacion: 'password_hash() crea un hash seguro de contraseña usando bcrypt.',
        },
        {
          pregunta: '¿Qué hace password_verify()?',
          opciones: [
            'Cambia contraseña',
            'Verifica contraseña contra hash',
            'Genera hash',
            'Valida formato',
          ],
          correcta: 1,
          explicacion: 'password_verify() comprueba si una contraseña corresponde a un hash.',
        },
        {
          pregunta: '¿Qué es el operador ?? en PHP 7?',
          opciones: [
            'Comparación',
            'Null coalescing, retorna valor si no es null',
            'Concatenación',
            'Potencia',
          ],
          correcta: 1,
          explicacion: '?? retorna el operando izquierdo si no es null, si no el derecho.',
        },
        {
          pregunta: '¿Qué hace sprintf() en PHP?',
          opciones: [
            'Imprime en pantalla',
            'Formatea string con variables',
            'Divide string',
            'Busca en string',
          ],
          correcta: 1,
          explicacion: 'sprintf() formatea un string según especificadores sin imprimirlo.',
        },
        {
          pregunta: '¿Qué es el modo estricto en PHP?',
          opciones: [
            'Modo de depuración',
            'declare(strict_types=1) fuerza tipos',
            'Modo de producción',
            'Modo seguro',
          ],
          correcta: 1,
          explicacion: 'strict_types=1 obliga a que los tipos de parámetros coincidan exactamente.',
        },
        {
          pregunta: '¿Qué hace array_unique()?',
          opciones: ['Ordena array', 'Elimina valores duplicados', 'Cuenta únicos', 'Filtra nulos'],
          correcta: 1,
          explicacion: 'array_unique() retorna array eliminando los valores duplicados.',
        },
        {
          pregunta: '¿Qué hace usort()?',
          opciones: [
            'Ordena por clave',
            'Ordena array con función de comparación personalizada',
            'Ordena inversamente',
            'Ordena por tipo',
          ],
          correcta: 1,
          explicacion:
            'usort() ordena un array usando una función de comparación definida por el usuario.',
        },
        {
          pregunta: '¿Qué hace file_get_contents()?',
          opciones: [
            'Lista archivos',
            'Lee archivo completo en string',
            'Escribe archivo',
            'Borra archivo',
          ],
          correcta: 1,
          explicacion: 'file_get_contents() lee el contenido completo de un archivo o URL.',
        },
        {
          pregunta: '¿Qué hace serialize() en PHP?',
          opciones: [
            'Cifra datos',
            'Convierte estructura PHP a string almacenable',
            'Comprime datos',
            'Formatea datos',
          ],
          correcta: 1,
          explicacion: 'serialize() convierte un valor PHP en una representación almacenable.',
        },
        {
          pregunta: '¿Qué es un prepared statement en PHP?',
          opciones: [
            'Consulta preparada sin seguridad',
            'Consulta parametrizada para prevenir SQL injection',
            'Caché de consultas',
            'Tipo de transacción',
          ],
          correcta: 1,
          explicacion: 'Los prepared statements separan SQL de datos previniendo SQL injection.',
        },
        {
          pregunta: '¿Qué hace compact() en PHP?',
          opciones: [
            'Comprime array',
            'Crea array con variables locales',
            'Elimina variables',
            'Une variables',
          ],
          correcta: 1,
          explicacion: 'compact() crea array usando variables del ámbito actual por su nombre.',
        },
        {
          pregunta: '¿Qué hace extract() en PHP?',
          opciones: [
            'Extrae archivo',
            'Crea variables desde array asociativo',
            'Exporta datos',
            'Lee propiedades',
          ],
          correcta: 1,
          explicacion: 'extract() crea variables en el ámbito actual desde las claves de un array.',
        },
        {
          pregunta: '¿Qué es el operador <=> en PHP?',
          opciones: [
            'Igualdad estricta',
            'Comparación combinada (spaceship)',
            'Asignación',
            'Mayor o igual',
          ],
          correcta: 1,
          explicacion: 'El operador spaceship retorna -1, 0 o 1 según la comparación.',
        },
        {
          pregunta: '¿Qué hace unset() en PHP?',
          opciones: [
            'Define constante',
            'Destruye una o más variables',
            'Convierte tipo',
            'Elimina archivo',
          ],
          correcta: 1,
          explicacion: 'unset() elimina las variables especificadas liberando memoria.',
        },
        {
          pregunta: '¿Qué hace is_array()?',
          opciones: [
            'Convierte a array',
            'Comprueba si variable es un array',
            'Cuenta elementos',
            'Filtra array',
          ],
          correcta: 1,
          explicacion: 'is_array() retorna true si la variable es un array.',
        },
        {
          pregunta: '¿Qué hace in_array()?',
          opciones: ['Busca valor en array', 'Elimina valor', 'Cuenta ocurrencias', 'Ordena array'],
          correcta: 0,
          explicacion: 'in_array() comprueba si un valor existe en un array.',
        },
        {
          pregunta: '¿Qué hace array_keys()?',
          opciones: [
            'Retorna todas las claves de un array',
            'Retorna valores',
            'Elimina claves',
            'Invierte claves',
          ],
          correcta: 0,
          explicacion: 'array_keys() devuelve todas las claves numéricas o string de un array.',
        },
        {
          pregunta: '¿Qué hace array_values()?',
          opciones: [
            'Retorna claves',
            'Retorna todos los valores reindexando',
            'Elimina valores',
            'Cuenta valores',
          ],
          correcta: 1,
          explicacion:
            'array_values() devuelve todos los valores del array con índices numéricos consecutivos.',
        },
        {
          pregunta: '¿Qué es una excepción en PHP?',
          opciones: [
            'Error fatal',
            'Objeto que representa un error controlable',
            'Advertencia',
            'Evento del sistema',
          ],
          correcta: 1,
          explicacion: 'Exception es una clase para manejar errores con try-catch.',
        },
        {
          pregunta: '¿Qué hace try-catch en PHP?',
          opciones: [
            'Ejecuta código normalmente',
            'Maneja excepciones capturando errores',
            'Crea bucles',
            'Define funciones',
          ],
          correcta: 1,
          explicacion: 'try-catch permite capturar y manejar excepciones sin detener el script.',
        },
        {
          pregunta: '¿Qué hace finally en PHP?',
          opciones: [
            'Siempre se ejecuta tras try-catch',
            'Se ejecuta solo si hay error',
            'Se ejecuta si no hay error',
            'Detiene ejecución',
          ],
          correcta: 0,
          explicacion: 'finally se ejecuta siempre después de try y catch, haya o no excepción.',
        },
        {
          pregunta: '¿Qué hace throw en PHP?',
          opciones: [
            'Captura error',
            'Lanza una excepción manualmente',
            'Detiene script',
            'Muestra error',
          ],
          correcta: 1,
          explicacion: 'throw lanza una excepción que puede ser capturada con catch.',
        },
        {
          pregunta: '¿Qué es una función anónima en PHP?',
          opciones: [
            'Función sin nombre',
            'Función recursiva',
            'Función estática',
            'Función predefinida',
          ],
          correcta: 0,
          explicacion:
            'Una función anónima (closure) puede asignarse a variables o pasarse como callback.',
        },
        {
          pregunta: '¿Qué hace preg_match()?',
          opciones: [
            'Reemplaza texto',
            'Realiza coincidencia con expresión regular',
            'Divide string',
            'Cuenta caracteres',
          ],
          correcta: 1,
          explicacion: 'preg_match() busca patrones en strings usando expresiones regulares.',
        },
        {
          pregunta: '¿Qué es un callback en PHP?',
          opciones: [
            'Llamada telefónica',
            'Función pasada como argumento a otra función',
            'Evento de sistema',
            'Variable especial',
          ],
          correcta: 1,
          explicacion: 'Un callback es una función llamable que se pasa como parámetro.',
        },
        {
          pregunta: '¿Qué hace call_user_func()?',
          opciones: [
            'Crea función',
            'Llama a un callback dado por el usuario',
            'Define función',
            'Evalúa código',
          ],
          correcta: 1,
          explicacion: 'call_user_func() ejecuta la función especificada como callback.',
        },
        {
          pregunta: '¿Qué es el autoloading en PHP?',
          opciones: [
            'Carga automática de archivos',
            'Carga manual de clases',
            'Carga de extensiones',
            'Carga de configuración',
          ],
          correcta: 0,
          explicacion: 'Autoloading carga automáticamente clases sin require explícito.',
        },
        {
          pregunta: '¿Qué hace spl_autoload_register()?',
          opciones: [
            'Desactiva autoload',
            'Registra una función para autoloading',
            'Carga clases',
            'Borra funciones',
          ],
          correcta: 1,
          explicacion: 'spl_autoload_register() registra funciones de autoload personalizadas.',
        },
        {
          pregunta: '¿Qué es PHP-FIG?',
          opciones: [
            'Framework PHP',
            'Grupo de estándares PHP (PSR)',
            'Motor de plantillas',
            'Servidor web',
          ],
          correcta: 1,
          explicacion: 'PHP-FIG publica estándares como PSR-4, PSR-7, etc.',
        },
        {
          pregunta: '¿Qué es PSR-4?',
          opciones: ['Estándar de autoloading', 'Estándar de logging', 'Interfaz HTTP', 'Caché'],
          correcta: 0,
          explicacion: 'PSR-4 define el estándar de autoloading de clases desde namespaces.',
        },
      ],
    };
    return banco[categoria] || [];
  }
}
