class Juego {

    constructor() {

        this.vidas = 3;
        this.puntaje = 0;

        this.salaActual = 0;
        this.preguntaActual = 0;

        this.historias = [

            "Despiertas dentro del Laboratorio de Euler. Las puertas están selladas.",

            "Una terminal matemática se enciende. Debes superar las Sumatorias.",

            "La primera puerta se abre. Ahora enfrentas las Productorias.",

            "Solo queda una prueba. La sala de Inducción te espera.",

            "Has reunido las tres llaves. La puerta principal está frente a ti."

        ];

        this.salas = [

            {
                nombre: "Sumatorias",
                imagen: "/IMG/Imagen2_Sumatorias.png",

                preguntas: [

                    {
                        pregunta: "Σ(1..5)",
                        opciones: ["10", "15", "20", "25"],
                        correcta: 1
                    },

                    {
                        pregunta: "Σ(1..10)",
                        opciones: ["45", "50", "55", "60"],
                        correcta: 2
                    },

                    {
                        pregunta: "Σ(1..20)",
                        opciones: ["200", "210", "220", "230"],
                        correcta: 1
                    }

                ]
            },

            {
                nombre: "Productoria",
                imagen: "/IMG/Imagen3_Productoria.png",

                preguntas: [

                    {
                        pregunta: "Π(1..4)",
                        opciones: ["12", "18", "24", "30"],
                        correcta: 2
                    },

                    {
                        pregunta: "Π(1..5)",
                        opciones: ["120", "150", "180", "200"],
                        correcta: 0
                    },

                    {
                        pregunta: "Π(1..6)",
                        opciones: ["600", "650", "700", "720"],
                        correcta: 3
                    }

                ]
            },

            {
                nombre: "Inducción",
                imagen: "/IMG/Imagen4_Induccion.png",

                preguntas: [

                    {
                        pregunta: "¿Primer paso de una demostración por inducción?",
                        opciones: [
                            "Caso Base",
                            "Hipótesis",
                            "Conclusión",
                            "Contradicción"
                        ],
                        correcta: 0
                    },

                    {
                        pregunta: "¿Qué sigue después del caso base?",
                        opciones: [
                            "Conclusión",
                            "Hipótesis inductiva",
                            "Respuesta",
                            "Factorización"
                        ],
                        correcta: 1
                    },

                    {
                        pregunta: "¿Último paso?",
                        opciones: [
                            "Hipótesis",
                            "Caso Base",
                            "Paso Inductivo",
                            "Factor Común"
                        ],
                        correcta: 2
                    }

                ]
            }

        ];

        this.iniciar();
    }

    iniciar() {

        document
            .getElementById("btnJugar")
            .addEventListener("click", () => {

                document
                    .getElementById("menuPrincipal")
                    .classList.add("oculto");

                this.mostrarHistoria(
                    this.historias[0],
                    () => this.cargarSala()
                );

            });

    }

    mostrarHistoria(texto, callback) {

        const transicion =
            document.getElementById("transicion");

        const siguiente =
            document.getElementById("siguiente");

        document
            .getElementById("textoHistoria")
            .textContent = texto;

        transicion.classList.add("activo");

        siguiente.classList.remove("oculto");

        siguiente.onclick = () => {

            siguiente.classList.add("oculto");

            transicion.classList.remove("activo");

            callback();

        };

    }

    cargarSala() {

        let sala = this.salas[this.salaActual];

        document
            .getElementById("fondo")
            .style.backgroundImage =
            `url('${sala.imagen}')`;

        this.preguntaActual = 0;

        this.mostrarPregunta();

    }

    mostrarPregunta() {

        const sala =
            this.salas[this.salaActual];

        const pregunta =
            sala.preguntas[this.preguntaActual];

        document
            .getElementById("contenedorPregunta")
            .classList.remove("oculto");

        document
            .getElementById("tituloSala")
            .textContent = sala.nombre;

        document
            .getElementById("pregunta")
            .textContent = pregunta.pregunta;

        const opciones =
            document.getElementById("opciones");

        opciones.innerHTML = "";

        pregunta.opciones.forEach((texto, index) => {

            const boton =
                document.createElement("button");

            boton.textContent = texto;

            boton.onclick = () =>
                this.verificarRespuesta(
                    index,
                    pregunta.correcta
                );

            opciones.appendChild(boton);

        });

    }

    verificarRespuesta(respuesta, correcta) {

        if (respuesta === correcta) {

            this.puntaje += 100;

            this.mensaje("✅ Correcto");

            this.actualizarHUD();

            this.preguntaActual++;

            if (
                this.preguntaActual <
                this.salas[this.salaActual].preguntas.length
            ) {

                setTimeout(() => {

                    this.mostrarPregunta();

                }, 1000);

            } else {

                this.completarSala();

            }

        } else {

            this.vidas--;

            this.puntaje -= 25;

            this.mensaje("❌ Incorrecto");

            this.actualizarHUD();

            if (this.vidas <= 0) {

                setTimeout(() => {

                    this.derrota();

                }, 1000);

            }

        }

    }

    completarSala() {

        if (this.salaActual === 0) {

            document
                .getElementById("llaveSumatoria")
                .textContent = "🔑 Sumatoria";

        }

        if (this.salaActual === 1) {

            document
                .getElementById("llaveProductoria")
                .textContent = "🔑 Productoria";

        }

        if (this.salaActual === 2) {

            document
                .getElementById("llaveInduccion")
                .textContent = "🔑 Inducción";

        }

        this.salaActual++;

        if (this.salaActual >= this.salas.length) {

            this.puertaFinal();
            return;

        }

        this.mostrarHistoria(

            this.historias[this.salaActual],

            () => this.cargarSala()

        );

    }

    puertaFinal() {

        document
            .getElementById("fondo")
            .style.backgroundImage =
            "url('/IMG/Imagen5_PuertaFinal.png')";

        this.mostrarHistoria(

            "Has reunido las tres llaves. La salida está frente a ti.",

            () => this.victoria()

        );

    }

    actualizarHUD() {

        document
            .getElementById("puntaje")
            .textContent =
            "Puntaje: " + this.puntaje;

        document
            .getElementById("vidas")
            .textContent =
            "❤️".repeat(this.vidas);

    }

    mensaje(texto) {

        const mensaje =
            document.getElementById("mensajeFlotante");

        mensaje.innerHTML = texto;

        mensaje.classList.remove("oculto");

        setTimeout(() => {

            mensaje.classList.add("oculto");

        }, 1000);

    }

    victoria() {

        document
            .getElementById("contenedorPregunta")
            .classList.add("oculto");

        document
            .getElementById("fondo")
            .style.backgroundImage =
            "url('/IMG/Imagen6_Victoria.png')";

        const mensaje =
            document.getElementById("mensajeFlotante");

        mensaje.classList.remove("oculto");

        mensaje.innerHTML = `
            <h1>🏆 ESCAPASTE</h1>
            <p>Puntaje Final: ${this.puntaje}</p>
        `;

    }

    derrota() {

        document
            .getElementById("contenedorPregunta")
            .classList.add("oculto");

        document
            .getElementById("fondo")
            .style.backgroundImage =
            "url('/IMG/Imagen7_Derrota.png')";

        const mensaje =
            document.getElementById("mensajeFlotante");

        mensaje.classList.remove("oculto");

        mensaje.innerHTML = `
            <h1>💀 PERDISTE</h1>
            <p>Has agotado todas tus vidas.</p>
            <button onclick="location.reload()">
                Reintentar
            </button>
        `;

    }

}

new Juego();