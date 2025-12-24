# 🌊 Dashboard Educativo: Muestreo de Señales y Teorema de Nyquist-Shannon

## 📋 Descripción

Dashboard interactivo y educativo para comprender visualmente los conceptos fundamentales del **Procesamiento Digital de Señales**:

- ✅ **Señales senoidales continuas** (analógicas)
- 📏 **Amplitud y Frecuencia**
- 📊 **Muestreo de señales**
- 🔄 **Teorema de Nyquist-Shannon** (fs ≥ 2×f)
- ⚠️ **Detección y visualización de Aliasing**

Desarrollado como herramienta de **aprendizaje visual** para estudiantes de Procesamiento de Señales, Ingeniería Electrónica, Telecomunicaciones y disciplinas afines.

---

## 🚀 Instalación y Ejecución (MÁS FÁCIL)

### **Con doble clic (Recomendado)**

1. **Navega** a la carpeta `dashboard_muestreo`
2. **Haz doble clic** en `ejecutar_dashboard.bat`
3. ✅ El script automáticamente:
   - Verifica si Python está instalado
   - Crea un entorno virtual
   - Instala dependencias
   - Inicia el servidor
   - Abre el navegador en `http://localhost:5000`

### **Manual (Terminal/PowerShell)**

```powershell
# 1. Navega a la carpeta del proyecto
cd "ruta/al/dashboard_muestreo"

# 2. Crear entorno virtual
python -m venv venv

# 3. Activar entorno
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Windows (CMD):
venv\Scripts\activate.bat

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Ejecutar servidor
python app.py

# 6. Abrir navegador
# http://localhost:5000
```

---

## 📦 Estructura del Proyecto

```
dashboard_muestreo/
│
├── ejecutar_dashboard.bat          # ⭐ Script de ejecución automática
├── app.py                          # Backend Flask
├── requirements.txt                # Dependencias Python
│
├── templates/
│   └── index.html                  # Interfaz HTML
│
└── static/
    ├── style.css                   # Estilos CSS
    └── script.js                   # Lógica JavaScript (Plotly.js)
```

---

## 🎮 Uso del Dashboard

### Controles (Panel Izquierdo)

1. **📏 Amplitud** [0.5 - 5.0]
   - Controla la altura máxima de la onda
   - Mueve el slider para ver cambios en tiempo real

2. **📶 Frecuencia Señal (f)** [0.5 - 5.0 Hz]
   - Ciclos por segundo de la señal original
   - Aumentar = onda más rápida

3. **📊 Frecuencia Muestreo (fs)** [0.5 - 20.0 Hz]
   - Número de muestras por segundo
   - **Crítica para el Teorema de Nyquist**

### Visualizaciones

#### 📈 Gráfico 1: Señal Continua vs Muestras
- **Línea azul**: Señal analógica original (continua)
- **Puntos amarillos**: Muestras discretas tomadas a frecuencia fs

#### ⚠️ Gráfico 2: Aliasing (cuando aplica)
- Aparece **solo si se viola el Teorema de Nyquist**
- Muestra la "falsa frecuencia" que se reconstruiría
- **Línea punteada**: Señal original
- **Línea roja**: Señal alias (reconstrucción incorrecta)

### 📚 Panel de Información

**Estado Nyquist-Shannon:**
- ✅ **CORRECTO**: fs > 2×f (muestreo adecuado)
- ⚠️ **LÍMITE**: fs = 2×f (caso fronterizo)
- ❌ **ALIASING**: fs < 2×f (muestreo insuficiente)

---

## 🧠 Conceptos Pedagógicos

### Teorema de Nyquist-Shannon

Para reconstruir correctamente una señal analógica, **la frecuencia de muestreo debe ser al menos el doble de la frecuencia máxima de la señal**:

$$f_s \geq 2 \times f$$

Donde:
- **f**: Frecuencia de la señal original (Hz)
- **f_s**: Frecuencia de muestreo (muestras/segundo)
- **f_Nyquist**: 2×f (frecuencia mínima de muestreo)

### Ejemplos Prácticos

**Caso 1: Muestreo Correcto** ✅
```
f = 1 Hz (señal) → f_Nyquist = 2 Hz
fs = 10 Hz (muestreo) 
→ 10 > 2 ✅ CORRECTO
→ La señal se reconstruye perfectamente
```

**Caso 2: Violación de Nyquist (Aliasing)** ❌
```
f = 3 Hz (señal) → f_Nyquist = 6 Hz
fs = 4 Hz (muestreo) 
→ 4 < 6 ❌ INSUFICIENTE
→ Se genera frecuencia alias: f_alias ≈ 1 Hz
→ La señal reconstruida es FALSA
```

### Aliasing

**Aliasing**: Cuando fs < 2×f, las muestras no capturan suficiente información de la onda rápida. El sistema cree que está viendo una onda **más lenta** (falsa frecuencia).

En la práctica: Usar un filtro paso-bajo (anti-aliasing) **antes** de muestrear.

---

## 🛠️ Requisitos Técnicos

- **Python 3.7+** (descarga desde python.org)
- **Sin dependencias externas** (Flask, NumPy se instalan automáticamente)
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)
- **Conexión local** (no requiere internet)

---

## 📂 Archivos Detallados

### `ejecutar_dashboard.bat`
- Script Windows que automatiza todo
- Verifica Python
- Crea entorno virtual (venv)
- Instala dependencias
- Ejecuta servidor Flask
- Abre navegador automáticamente

### `app.py`
Backend Flask con:
- Funciones de procesamiento de señales (NumPy)
- Generación de señales senoidales
- Cálculo de muestreo
- Detección de aliasing
- API endpoint `/api/calcular` para datos en JSON

### `requirements.txt`
Dependencias Python:
- **Flask**: Framework web
- **NumPy**: Cálculos numéricos
- **Werkzeug**: Utilidades Flask

### `templates/index.html`
Interfaz HTML5:
- Sliders interactivos
- Elementos para gráficos Plotly
- Información Nyquist en tiempo real
- Responsive design

### `static/style.css`
Estilos visuales:
- Diseño moderno con gradientes
- Panel lateral pegajoso
- Gráficos responsivos
- Animaciones suaves
- Paleta de colores coherente

### `static/script.js`
Lógica interactiva:
- Event listeners para sliders
- Comunicación con backend (fetch API)
- Gráficos con Plotly.js
- Actualización en tiempo real
- Detección de estado Nyquist

---

## 🎓 Actividades Educativas Sugeridas

### Actividad 1: Exploración Básica
1. Mueve el slider de **Amplitud** → observa cambio en altura
2. Mueve el slider de **Frecuencia** → observa ciclos más rápidos/lentos
3. Mueve el slider de **Frecuencia de Muestreo** → observa cómo cambian los puntos

### Actividad 2: Teorema de Nyquist
1. Fija **f = 1 Hz**
2. Baja **fs a 2 Hz** → observa estado = "LÍMITE"
3. Baja **fs a 1.5 Hz** → aparece aliasing
4. Sube **fs a 2.5 Hz** → desaparece aliasing
5. **Conclusión**: Necesitas fs > 2×f

### Actividad 3: Aliasing Profundo
1. Fija **f = 2 Hz**
2. Coloca **fs = 3 Hz** (insuficiente)
3. Observa gráfico de aliasing
4. La "falsa" frecuencia es f_alias ≈ 1 Hz
5. Explica por qué las muestras no son suficientes

### Actividad 4: Caso Real - Audio
1. Un CD de audio tiene fs = 44.1 kHz
2. El oído humano escucha hasta ~20 kHz
3. f_Nyquist = 2 × 20 = 40 kHz
4. ¿Cumple? Sí: 44.1 > 40 ✅
5. Por eso el CD reproduce correctamente

---

## ❓ Preguntas Frecuentes

### P: Se abre una ventana negra y se cierra rápido
**R**: Probablemente Python no está en el PATH. Instala Python desde python.org y marca "Add Python to PATH".

### P: "Error: Flask not found"
**R**: El script debería instalar automáticamente. Intenta manualmente: `pip install Flask numpy`

### P: ¿Funciona sin internet?
**R**: Sí, completamente local. **Excepto**: Plotly.js se carga de CDN. Puedes descargar una versión local si no tienes internet.

### P: ¿Puedo modificar los rangos de los sliders?
**R**: Sí, edita `templates/index.html` y busca los atributos `min`, `max`, `step` de los inputs range.

### P: ¿Cómo agrego más visualizaciones?
**R**: Edita `static/script.js` para agregar más trazas en Plotly o cálculos adicionales en `app.py`.

---

## 🚀 Mejoras Futuras

- [ ] Agregar filtros digitales (paso-bajo, paso-alto)
- [ ] Simulación con señales reales (micrófono)
- [ ] Modo "laboratorio" con múltiples señales
- [ ] Exportar gráficos como PNG
- [ ] Animación paso-a-paso del muestreo
- [ ] Integración con Arduino para señales reales
- [ ] Múltiples idiomas

---

## 📄 Licencia

Código educativo de libre distribución. Úsalo en tus clases y comparte.

---

## 👨‍💻 Desarrollo

**Desarrollado como herramienta educativa** para enseñanza de Procesamiento Digital de Señales.

**Stack**:
- Backend: Python + Flask
- Frontend: HTML5 + CSS3 + JavaScript
- Gráficos: Plotly.js
- Cálculos: NumPy

---

## 📞 Contacto / Soporte

Si encuentras bugs o tienes sugerencias:
1. Revisa que Python esté correctamente instalado
2. Intenta borrar la carpeta `venv` y ejecutar de nuevo
3. Abre un issue o contacta al desarrollador

---

**¡Feliz aprendizaje! 🎓📊**

Esperamos que este dashboard te ayude a comprender mejor el fascinante mundo del Procesamiento Digital de Señales.
