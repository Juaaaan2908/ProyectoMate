        class Juego {

            constructor() {
                this.vidas = 3;
                this.puntaje = 0;
                
                this.totalPreguntas = 9;
                this.preguntasRespondidas = 0;

                this.salaActual = 0;
                this.preguntaActual = 0;

                this.historias = [
                    "Año 2085. Despiertas dentro del Laboratorio de Euler. Las puertas están bloqueadas y una inteligencia artificial te reta a resolver desafíos matemáticos.",
                    "La primera puerta contiene pruebas de Sumatorias. Encuentra el patrón correcto para avanzar.",
                    "La primera llave es tuya. Ahora ingresas a la sala de Productorias.",
                    "Solo queda una puerta. La sala de Inducción pondrá a prueba tu razonamiento.",
                    "Las tres llaves han sido obtenidas. La salida está cerca."
                ];

                this.salas = [
                    {
                        nombre: "Sumatorias",
                        imagen: "IMG/Imagen2_Sumatorias.png",
                        preguntas: [
                            {
                                pregunta: "Calcule el valor de: Σ (k² - 2k) desde k=1 hasta k=6",
                                opciones: ["65", "55", "71", "49"],
                                correcta: 1 // 55
                            },
                            {
                                pregunta: "Calcule el valor de la sumatoria: Σ (3k + 5) desde k=4 hasta k=9",
                                opciones: ["132", "147", "114", "126"],
                                correcta: 0 // 132
                            },
                            {
                                pregunta: "Si Σ (k³) desde k=1 hasta n es igual a 3025, ¿cuál es el valor de n?",
                                opciones: ["9", "10", "11", "12"],
                                correcta: 1 // 10
                            }
                        ]
                    },
                    {
                        nombre: "Productoria",
                        imagen: "IMG/Imagen3_Productoria.png",
                        preguntas: [
                            {
                                pregunta: "Evalúe la siguiente productoria: Π (2i - 1) desde i=1 hasta i=5",
                                opciones: ["945", "105", "384", "1155"],
                                correcta: 0 // 945
                            },
                            {
                                pregunta: "Determine el resultado exacto de: Π (k / (k + 1)) desde k=1 hasta k=24",
                                opciones: ["1/24", "1/25", "24/25", "1/50"],
                                correcta: 1 // 1/25
                            },
                            {
                                pregunta: "Calcule la productoria: Π (1 - 1/n²) desde n=2 hasta n=5",
                                opciones: ["5/8", "3/5", "3/4", "7/10"],
                                correcta: 1 // 3/5
                            }
                        ]
                    },
                    {
                        nombre: "Inducción",
                        imagen: "IMG/Imagen4_Induccion.png",
                        preguntas: [
                            {
                                pregunta: "Para demostrar que 7ⁿ - 1 es divisible entre 6 usando inducción, en el paso inductivo evaluamos 7ᵏ⁺¹ - 1. ¿Cuál es la expresión factorizada clave?",
                                opciones: ["7(7ᵏ - 1) + 6", "6(7ᵏ) + (7ᵏ - 1)", "7ᵏ(6) - 1", "7(7ᵏ) - 6"],
                                correcta: 0 // 7(7ᵏ - 1) + 6
                            },
                            {
                                pregunta: "La suma de los primeros 'n' números impares es n². Si asumimos P(k) como verdadera, ¿cómo se escribe el desarrollo para P(k+1)?",
                                opciones: ["k² + (2k + 1)", "k² + (2k - 1)", "(k + 1)² + 1", "k² + 2k"],
                                correcta: 0 // k² + (2k + 1)
                            },
                            {
                                pregunta: "Al demostrar por inducción que 2ⁿ > n² para n ≥ 5, si asumimos que 2ᵏ > k², ¿cuál es la desigualdad intermedia necesaria para completar el paso inductivo?",
                                opciones: ["2ᵏ ≥ 2k + 1", "k² > 2k + 1", "2ᵏ > k", "k² + 1 > 2k"],
                                correcta: 1 // k² > 2k + 1 (ya que para k>=5, k^2 > 2k+1, permitiendo probar que 2*k^2 > k^2 + 2k + 1)
                            }
                        ]
                    }
                ];

                this.actualizarProgreso();
                this.iniciar();
            }

            iniciar() {
                document.getElementById("btnJugar").addEventListener("click", () => {
                    document.getElementById("menuPrincipal").classList.add("oculto");
                    this.mostrarHistoria(
                        this.historias[0],
                        () => this.cargarSala()
                    );
                });
            }

            mostrarHistoria(texto, callback) {
                const transicion = document.getElementById("transicion");
                const siguiente = document.getElementById("siguiente");

                document.getElementById("textoHistoria").textContent = texto;
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
                document.getElementById("fondo").style.backgroundImage = `url('${sala.imagen}')`;
                this.preguntaActual = 0;
                this.mostrarPregunta();
            }

            mostrarPregunta() {
                const sala = this.salas[this.salaActual];
                const pregunta = sala.preguntas[this.preguntaActual];

                document.getElementById("contenedorPregunta").classList.remove("oculto");
                document.getElementById("tituloSala").textContent = sala.nombre;
                document.getElementById("pregunta").textContent = pregunta.pregunta;

                const opciones = document.getElementById("opciones");
                opciones.innerHTML = "";

                pregunta.opciones.forEach((texto, index) => {
                    const boton = document.createElement("button");
                    boton.textContent = texto;
                    boton.onclick = () => this.verificarRespuesta(index, pregunta.correcta);
                    opciones.appendChild(boton);
                });
            }

            verificarRespuesta(respuesta, correcta) {
                const sala = this.salas[this.salaActual];
                const pregunta = sala.preguntas[this.preguntaActual];
                const respuestaCorrectaTexto = pregunta.opciones[correcta];

                if (respuesta === correcta) {
                    this.puntaje += 100;
                    this.preguntasRespondidas++;
                    this.actualizarProgreso();
                    this.mensaje("✅ ¡Correcto!\n+100 puntos");
                    this.actualizarHUD();
                    this.preguntaActual++;

                    if (this.preguntaActual < this.salas[this.salaActual].preguntas.length) {
                        setTimeout(() => {
                            this.mostrarPregunta();
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            this.completarSala();
                        }, 1500);
                    }
                } else {
                    this.vidas--;
                    this.puntaje -= 25;
                    // Aquí añadimos la retroalimentación mostrando el valor correcto
                    this.mensaje(`❌ Incorrecto\nLa respuesta era: ${respuestaCorrectaTexto}`);
                    this.actualizarHUD();

                    if (this.vidas <= 0) {
                        setTimeout(() => {
                            this.derrota();
                        }, 1500);
                    }
                }
            }

            completarSala() {
                let idLlave = "";
                let nombreLlave = "";

                if (this.salaActual === 0) {
                    idLlave = "llaveSumatoria";
                    nombreLlave = "🔑 Sumatoria";
                } else if (this.salaActual === 1) {
                    idLlave = "llaveProductoria";
                    nombreLlave = "🔑 Productoria";
                } else if (this.salaActual === 2) {
                    idLlave = "llaveInduccion";
                    nombreLlave = "🔑 Inducción";
                }

                if (idLlave) {
                    const llaveElemento = document.getElementById(idLlave);
                    llaveElemento.textContent = nombreLlave;
                    llaveElemento.classList.add("llaveAnimada");
                    setTimeout(() => {
                        llaveElemento.classList.remove("llaveAnimada");
                    }, 1000);
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
                document.getElementById("fondo").style.backgroundImage = "url('IMG/Imagen5_PuertaFinal.png')";
                this.mostrarHistoria(
                    "Has reunido las tres llaves. La salida está frente a ti.",
                    () => this.victoria()
                );
            }

            actualizarHUD() {
                document.getElementById("puntaje").textContent = "Puntaje: " + this.puntaje;
                document.getElementById("vidas").textContent = "❤️".repeat(Math.max(0, this.vidas));
            }

            actualizarProgreso() {
                let porcentaje = Math.floor((this.preguntasRespondidas / this.totalPreguntas) * 100);
                document.getElementById("progreso").textContent = "Progreso: " + porcentaje + "%";
            }

            mensaje(texto) {
                const mensaje = document.getElementById("mensajeFlotante");
                mensaje.innerHTML = texto.replace(/\n/g, "<br>");
                mensaje.classList.remove("oculto");

                // Subimos el tiempo a 2.5 segundos para darle tiempo al usuario de leer la retroalimentación si falla
                setTimeout(() => {
                    mensaje.classList.add("oculto");
                }, 2500);
            }

            victoria() {
                document.getElementById("contenedorPregunta").classList.add("oculto");
                document.getElementById("fondo").style.backgroundImage = "url('IMG/Imagen6_Victoria.png')";

                const mensaje = document.getElementById("mensajeFlotante");
                mensaje.classList.remove("oculto");
                mensaje.innerHTML = `
                    <h1>🏆 ESCAPASTE</h1>
                    <p>Puntaje Final: ${this.puntaje}</p>
                `;
            }

            derrota() {
                document.getElementById("contenedorPregunta").classList.add("oculto");
                document.getElementById("fondo").style.backgroundImage = "url('IMG/Imagen7_Derrota.png')";

                const mensaje = document.getElementById("mensajeFlotante");
                mensaje.classList.remove("oculto");
                mensaje.innerHTML = `
                    <h1>💀 PERDISTE</h1>
                    <p>Has agotado todas tus vidas.</p>
                    <button onclick="location.reload()">Reintentar</button>
                `;
            }
        }

        window.addEventListener("DOMContentLoaded", () => {
            new Juego();
        });