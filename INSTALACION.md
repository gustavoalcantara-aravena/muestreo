# 📊 Instalación y Ejecución del Dashboard

## Asignatura
**Comunicaciones y Redes Industriales**

---

## 🚀 Inicio Rápido (3 Pasos)

### Opción 1️⃣: DOBLE CLIC (⭐ Recomendado)

1. **Navega** a la carpeta: `dashboard_muestreo/`
2. **Haz doble clic** en: `ejecutar_dashboard.bat`
3. **Espera** 10-15 segundos
4. ✅ El dashboard se abrirá automáticamente en http://localhost:5000

**¡Eso es todo!** El script automáticamente:
- ✅ Verifica si Python 3.7+ está instalado
- ✅ Crea un entorno virtual (`venv/`)
- ✅ Instala dependencias (Flask, NumPy)
- ✅ Inicia el servidor Flask
- ✅ Abre el navegador automáticamente

---

## 📋 Requisitos Previos

### ✅ Requisito: Python 3.7+

**Verificar instalación:**
```powershell
python --version
```

**Resultado esperado:**
```
Python 3.x.x
```

**Si no aparece nada:**
1. Descarga Python desde: https://www.python.org/downloads/
2. **⚠️ IMPORTANTE**: Durante la instalación, marca ☑️ "Add Python to PATH"
3. Reinicia PowerShell/CMD
4. Verifica nuevamente con `python --version`

---

## 🔧 Opción 2️⃣: Ejecución Manual (Avanzado)

Si prefieres ejecutar manualmente:

```powershell
# 1. Navega a la carpeta del proyecto
cd "c:\ruta\a\dashboard_muestreo"

# 2. Crea entorno virtual
python -m venv venv

# 3. Activa entorno virtual
# En Windows PowerShell:
.\venv\Scripts\Activate.ps1

# En Windows CMD:
venv\Scripts\activate.bat

# En Linux/macOS:
source venv/bin/activate

# 4. Instala dependencias
pip install -r requirements.txt

# 5. Ejecuta servidor
python app.py

# 6. Abre navegador
# Accede a: http://localhost:5000
```

---

## 📁 Estructura del Proyecto

```
dashboard_muestreo/
│
├── ejecutar_dashboard.bat          ⭐ EJECUTA AQUÍ (doble clic)
├── app.py                          Backend Flask
├── requirements.txt                Dependencias
├── INSTALACION.md                  Este archivo
│
├── templates/
│   └── index.html                  Interfaz web
│
├── static/
│   ├── style.css                   Estilos CSS
│   └── script.js                   Lógica JavaScript
│
└── venv/                           Entorno virtual (se crea automáticamente)
```

---

## 🌐 Acceder al Dashboard

Una vez que el servidor esté corriendo:

**URL:** http://localhost:5000

**En el navegador verás:**
- Panel de controles (Sliders)
- Gráficos interactivos
- Información Nyquist en tiempo real
- Información educativa adicional

---

## ⏹️ Detener el Servidor

Cuando termines de usar:

1. Ve a la ventana PowerShell/CMD donde se ejecuta el servidor
2. Presiona: **Ctrl + C**
3. Responde: **s** (sí) si pregunta

El servidor se cerrará.

---

## 🆘 Solución de Problemas

### ❌ "Python not found"
```
Solución:
1. Instala Python desde https://www.python.org
2. Marca "Add Python to PATH"
3. Reinicia tu terminal
4. Verifica: python --version
```

### ❌ "ModuleNotFoundError: No module named 'flask'"
```
Solución:
1. Abre PowerShell en la carpeta del proyecto
2. Ejecuta: pip install Flask numpy
3. Luego: python app.py
```

### ❌ "Port 5000 already in use"
```
Solución 1: Espera un momento y reinicia
Solución 2: Edita app.py, última línea:
   Cambia: app.run(port=5000)
   A: app.run(port=5001)
   Luego accede a: http://localhost:5001
```

### ❌ "El navegador no se abre automáticamente"
```
Solución:
1. Abre manualmente: http://localhost:5000
2. Verifica que veas el mensaje "Running on..." en PowerShell
```

### ❌ "No veo las gráficas"
```
Solución:
1. Abre Consola del Navegador (F12 → Console)
2. Busca errores rojos
3. Recarga la página (Ctrl+R o F5)
4. Si persiste, cierra navegador y abre URL nuevamente
```

---

## 📊 Características del Dashboard

### Controles Interactivos
- **Amplitud** [0.5 - 5.0]: Altura de la onda
- **Frecuencia Señal** [0.5 - 5.0 Hz]: Ciclos por segundo
- **Frecuencia Muestreo** [0.5 - 20.0 Hz]: Muestras por segundo

### Visualizaciones
- **Gráfico 1**: Señal continua (azul) + Muestras discretas (puntos amarillos)
- **Gráfico 2**: Efecto de aliasing (cuando fs < 2×f)

### Información en Tiempo Real
- Estado de Nyquist (✅ Correcto / ⚠️ Límite / ❌ Aliasing)
- Valores numéricos de frecuencias
- Información educativa expandible

---

## 🎓 Conceptos Educativos

### Muestreo
Captura de valores discretos de una señal continua a intervalos regulares.
- Intervalo de muestreo: Ts = 1/fs
- Frecuencia de muestreo: fs (Hz)

### Teorema de Nyquist-Shannon
Para reconstruir correctamente una señal:
$$f_s \geq 2 \times f$$

### Aliasing
Error cuando fs < 2×f que genera una "falsa" frecuencia más baja.

### Regeneración de Señal
Si Nyquist ✅: Se puede reconstruir la señal original usando interpolación sinc.

---

## 📚 Stack Tecnológico

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Backend | Python | 3.7+ |
| Framework | Flask | 3.0.0 |
| Cálculos | NumPy | 1.24.3 |
| Frontend | HTML5/CSS3 | - |
| Interactividad | JavaScript | ES6+ |
| Gráficos | Plotly.js | CDN |

---

## 🔗 Dependencias

Las siguientes dependencias se instalan automáticamente:

```
Flask==3.0.0          # Framework web
numpy==1.24.3         # Cálculos numéricos
Werkzeug==3.0.0       # Utilidades Flask
```

---

## 💡 Consejos de Uso

1. **Experimenta con los sliders**: Observa cómo los gráficos cambian en tiempo real
2. **Lee la información pedagógica**: Comprende los conceptos mientras experimentas
3. **Busca el punto de Nyquist**: Intenta encontrar dónde aparece aliasing
4. **Caso real - Audio CD**: fs = 44.1 kHz (oído humano ~20 kHz max)

---

## 📞 Contacto y Soporte

Si encuentras problemas:
1. Verifica que Python esté en el PATH
2. Abre la Consola del Navegador (F12) para ver errores
3. Intenta borrar la carpeta `venv` y ejecutar de nuevo

---

## 📄 Licencia

Dashboard educativo de libre distribución para fines educativos.

---

**¡Listo para aprender sobre Procesamiento Digital de Señales! 🚀📊**

Fecha de creación: 2024
Asignatura: Comunicaciones y Redes Industriales
