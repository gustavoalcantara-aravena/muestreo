# ❓ Preguntas Frecuentes (FAQ)

## Instalación y Ejecución

### ❓ P: "¿Cómo ejecuto el dashboard?"
**R:** Dos opciones:
1. **⭐ Más fácil:** Haz doble clic en `ejecutar_dashboard.bat`
2. **Manual:** Abre PowerShell en la carpeta y ejecuta:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python app.py
   ```
Luego abre el navegador en http://localhost:5000

---

### ❓ P: "Me dice 'Python not found'"
**R:** Python no está en el PATH del sistema.
- Descarga Python de https://www.python.org/downloads/
- **IMPORTANTE:** Durante instalación, marca ☑️ "Add Python to PATH"
- Reinicia PowerShell/CMD
- Verifica: `python --version`

---

### ❓ P: "¿Necesito instalar algo adicional?"
**R:** No. El archivo `.bat` hace todo automáticamente:
- Verifica Python
- Crea entorno virtual (`venv/`)
- Instala dependencias (Flask, NumPy)
- Inicia servidor
- Abre navegador

Solo necesitas **Python 3.7+** en tu PC.

---

### ❓ P: "¿Qué es ese archivo .bat?"
**R:** Un script de Windows que automatiza todo el proceso.
- `.bat` = Batch file (instrucciones para Windows)
- Abre PowerShell
- Ejecuta comandos secuencialmente
- Te ahorra escribir 10+ comandos manualmente

---

### ❓ P: "¿Puedo ejecutarlo en Mac/Linux?"
**R:** El `.bat` es solo para Windows. En Mac/Linux:
```bash
# En terminal
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

### ❓ P: "¿Qué puerto usa el servidor?"
**R:** Puerto **5000** por defecto.
- URL: http://localhost:5000
- Si está ocupado, edita `app.py` última línea:
  ```python
  app.run(port=5001)  # Cambia a 5001
  ```

---

## Conceptos Teóricos

### ❓ P: "¿Qué es el Teorema de Nyquist?"
**R:** Regla fundamental para muestrear correctamente:

$$f_s \geq 2 \times f_{max}$$

**En palabras:** La frecuencia de muestreo **debe ser al menos el doble** de la frecuencia más alta en la señal.

**Ejemplo:** Para audio (hasta 20 kHz), necesitas fs ≥ 40 kHz
- CD: fs = 44.1 kHz ✅ (supera el mínimo)

---

### ❓ P: "¿Qué es el Aliasing?"
**R:** Error que ocurre cuando **fs < 2×f** (Nyquist violado).

**Efecto:** Una frecuencia alta aparece como una frecuencia baja "falsa"

**Ejemplo visual:**
```
Realidad:    Señal 4 Hz tomando 3 muestras/segundo
Resultado:   Parece ser 0.5 Hz (¡FALSO!)
```

**Es IRREVERSIBLE:** No puedes eliminarlo después.

---

### ❓ P: "¿Por qué dos veces la frecuencia?"
**R:** Por propiedades matemáticas de sinusoides.

Una sinusoide necesita **al menos 2 puntos** para determinarla:
- 1 muestra: No sabes si sube o baja
- 2+ muestras por ciclo: Ya puedes determinarla
- Por eso: fs ≥ 2×f

---

### ❓ P: "¿Qué es la Cuantificación?"
**R:** Convertir amplitudes reales (infinita precisión) a un número finito de bits.

**Ejemplo:**
- Valor real: 2.758293749...
- Con 8 bits: 3 (2^8 = 256 niveles)
- Pérdida: 0.758...

**CD Audio (16 bits):**
- 65,536 niveles posibles
- Error máximo: 1/65,536 ≈ 0.0015%

---

### ❓ P: "¿Puedo recuperar la precisión perdida por cuantificación?"
**R:** **NO**, es irreversible.

Una vez cuantificada, la precisión se perdió permanentemente.

Por eso elegir suficientes bits es CRÍTICO:
- Pocos bits (8): Mucho ruido
- Muchos bits (24, 32): Poco ruido, mejor calidad

---

### ❓ P: "¿Cuántos bits necesito?"
**R:** Depende de la aplicación:

| Aplicación | Bits | Niveles | SNR | Uso |
|-----------|------|---------|-----|-----|
| Telefonía | 8 | 256 | ~48 dB | Voz telefónica |
| **CD Audio** | **16** | **65K** | **~96 dB** | Música estándar |
| Profesional | 24 | 16.7M | ~144 dB | Estudio grabación |
| Científico | 32 | 4.3B | ~192 dB | Mediciones precisas |

**Regla:** Más bits = Menos ruido = Mejor calidad

---

### ❓ P: "¿Qué es SNR (Signal-to-Noise Ratio)?"
**R:** Relación entre potencia de señal y potencia de ruido.

$$SNR \approx 6.02 \times N + 1.76 \text{ dB}$$

**Interpretación:**
- **96 dB** (16 bits): Muy bueno para audio
- **48 dB** (8 bits): Solo para voz telefónica
- Mayor SNR = Menos audible el ruido de cuantificación

---

### ❓ P: "¿Qué es la función sinc?"
**R:** Función matemática clave en procesamiento digital:

$$sinc(x) = \frac{\sin(\pi x)}{\pi x}$$

**Propiedades:**
- Vale 1 en x=0
- Vale 0 en x=1, 2, 3, ...
- Se usa para **reconstruir la señal** a partir de muestras

**En la práctica:** Los DAC usan filtros que aproximan la sinc

---

### ❓ P: "¿Se puede reconstruir exactamente?"
**R:** Teóricamente SÍ, si:
1. ✅ Se cumple Nyquist (fs ≥ 2×f)
2. ✅ Usas filtro de reconstrucción ideal (infinitamente complejo)
3. ✅ No hay cuantificación

**En la práctica:** NO exactamente, porque:
- Los filtros ideales no existen
- La cuantificación introduce error
- Hay jitter de muestreo
- Hay redondeo numérico

**Resultado:** x'(t) ≈ x(t) + pequeño error

---

## Uso del Dashboard

### ❓ P: "¿Qué hacen los sliders?"
**R:**
- **📏 Amplitud:** Altura de la onda (0.5 a 5.0)
- **📍 Frecuencia:** Ciclos por segundo (0.5 a 5.0 Hz)
- **🎚️ Muestreo:** Frecuencia de muestreo (0.5 a 20.0 Hz)

**Efecto:** Los cambios se ven INMEDIATAMENTE en los gráficos

---

### ❓ P: "¿Qué significan los colores?"
**R:**
- **Azul continuo:** Señal analógica (teórica)
- **Puntos amarillos:** Muestras discretas (capturadas)
- **Línea roja:** Señal alias (cuando hay error)

---

### ❓ P: "¿Por qué a veces aparece un segundo gráfico?"
**R:** Cuando fs < 2×f (Nyquist violado):
- Aparece el "Gráfico de Aliasing"
- Muestra la frecuencia falsa que aparece
- Es lo que el observador creería (erróneamente) que está viendo

---

### ❓ P: "¿Qué quiere decir '✅ CORRECTO', '⚠️ LÍMITE', '❌ ALIASING'?"
**R:**
| Estado | Condición | Significa |
|--------|-----------|-----------|
| ✅ CORRECTO | fs ≥ 2×f | Nyquist cumplido, sin problemas |
| ⚠️ LÍMITE | 1.5×f ≤ fs < 2×f | Justo en el borde, riesgoso |
| ❌ ALIASING | fs < 1.5×f | Aliasing severo, distorsionado |

---

### ❓ P: "¿Cómo hago experimentos?"
**R:** Algunas ideas:
1. Mantén amplitud=1, frecuencia=2, aumenta muestreo → Observa transición
2. Fija muestreo=5, aumenta frecuencia → Observa cuándo aparece aliasing
3. Busca exactamente fs = 2×f → Verifica que es el límite

---

## Problemas Comunes

### ❓ P: "Veo 'HTTP 400' o errores en consola"
**R:** 
1. Abre Consola (F12 → Console)
2. Recarga página (Ctrl+R)
3. Si persiste, reinicia el servidor:
   - Cierra PowerShell (Ctrl+C)
   - Ejecuta `.bat` nuevamente

---

### ❓ P: "Las gráficas no se ven"
**R:**
1. Verifica que veas el servidor corriendo (dice "Running on...")
2. Abre Consola (F12) → búsca errores rojos
3. Recarga (Ctrl+R o F5)
4. Si sigue fallando, reinicia servidor

---

### ❓ P: "¿Por qué los controles no funcionan?"
**R:** Posibles causas:
1. Servidor no respondiendo → Recarga
2. Plotly.js no cargó → Recarga
3. JavaScript error → Verifica Consola (F12)

---

### ❓ P: "El navegador no se abre automáticamente"
**R:** Abre manualmente:
- Copia: http://localhost:5000
- Pégalo en navegador
- Presiona Enter

---

### ❓ P: "¿Puedo cerrar la ventana negra de PowerShell?"
**R:** **NO** mientras uses el dashboard.
- La ventana negra = Servidor corriendo
- Si la cierras = Se detiene servidor = Dashboard no funciona
- Mantenla abierta mientras usas el dashboard

---

### ❓ P: "¿Cómo apago el servidor?"
**R:** En la ventana de PowerShell:
1. Presiona: **Ctrl + C**
2. Responde: **s** (sí)
3. Servidor se detiene

---

## Preguntas Teóricas Avanzadas

### ❓ P: "¿Qué es el jitter de muestreo?"
**R:** Variaciones aleatorias en Ts (intervalo de muestreo).

**Causa:** Osciladores imperfectos en hardware

**Efecto:** Distorsión adicional, especialmente en frecuencias altas

**Mitigación:** Osciladores de alta precisión, Phase-Locked Loops (PLL)

---

### ❓ P: "¿Qué es sobremuestreo (oversampling)?"
**R:** Usar fs >> 2×f (mucho más del mínimo necesario).

**Ventajas:**
- Filtro anti-aliasing más relajado
- Mejor reconstrucción
- Deja margen para imperfecciones

**Ejemplo:** CD Audio usa 44.1 kHz para banda hasta 20 kHz
- Mínimo teórico: 40 kHz
- Usado: 44.1 kHz (sobremuestreo: 1.1×)

---

### ❓ P: "¿Qué es submuestreo inteligente?"
**R:** En ciertas señales (bandpass), puedes usar fs < 2×f si sabes la banda de frecuencias.

**Ejemplo:** Señal entre 1000-2000 Hz
- Mínimo Nyquist: 4000 Hz (si cubriera 0-2000 Hz)
- Inteligente: ~2200 Hz (porque sabes dónde está la banda)

**Nota:** Requiere análisis previo, no lo hagas sin saber qué haces.

---

### ❓ P: "¿Por qué no usar infinitos bits?"
**R:**
- Costo: Más bits = Más transistores = Más caro
- Velocidad: Más bits = Operaciones más lentas
- Potencia: Más bits = Más consumo
- Retorno: Beneficio se reduce (ley de rendimientos decrecientes)

**Balance:** Elegir bits suficientes, no excesivos

---

### ❓ P: "¿Qué es anti-aliasing?"
**R:** Técnica para **prevenir** el aliasing.

**Método:** Filtro paso-bajo analógico ANTES de muestrear
- Corta frecuencias > fs/2
- Elimina componentes que causarían aliasing
- Mantiene componentes importantes

**Analogía:** Es como "limpiar" la señal antes de muestrearla

---

## Preguntas sobre Aplicaciones Reales

### ❓ P: "¿CD de audio realmente usa esto?"
**R:** Sí, exactamente:

| Parámetro | Valor |
|-----------|-------|
| fs | 44.1 kHz |
| Bits | 16 |
| Canales | 2 (estéreo) |
| Duración máx | 80 minutos |

**Cálculo de datos:**
- 44.1k muestras/seg × 2 bytes × 2 canales = 176.4 KB/s
- 80 min × 60 seg = 4800 seg
- Total: 176.4 × 4800 ≈ 850 MB ≈ Capacidad CD

---

### ❓ P: "¿Y la telefonía?"
**R:** Usa 8 bits @ 8 kHz:

| Parámetro | Valor |
|-----------|-------|
| fs | 8 kHz |
| Bits | 8 |
| Rango frecuencias | 0-4 kHz (voz humana) |

**Razón:**
- La voz solo necesita hasta ~4 kHz
- 8 kHz es suficiente (Nyquist cumplido)
- 8 bits da poco ruido audible en voz

---

### ❓ P: "¿Por qué streaming de video usa otros valores?"
**R:** El video combina:
- **Audio:** 48 kHz, 24 bits (para video profesional)
- **Video:** 60 frames/segundo (distinto de audio)
- **Sincronización:** Algoritmos complejos

**Es diferente porque:**
- Video tiene 2 dimensiones (x, y) además de tiempo
- Requiere codificación especial (H.264, VP9)
- Hay compensación velocidad vs calidad

---

## ¿Aún tienes dudas?

### Preguntas frecuentes por tema:
- **Instalación:** Ver sección "Instalación y Ejecución"
- **Conceptos:** Ver sección "Conceptos Teóricos"
- **Dashboard:** Ver sección "Uso del Dashboard"
- **Problemas:** Ver sección "Problemas Comunes"
- **Avanzado:** Ver sección "Preguntas Teóricas Avanzadas"

### Recursos adicionales:
- **Documentación completa:** README_CURSO.md
- **Guía instalación:** INSTALACION.md
- **Código fuente:** Ver archivos app.py, script.js

---

**¡Espero haberte ayudado! 🚀📊**

*Si tienes más preguntas, consulta con tu profesor/instructor*
