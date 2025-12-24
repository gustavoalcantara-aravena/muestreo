# 📚 Dashboard Educativo: Procesamiento Digital de Señales

## Asignatura
**Comunicaciones y Redes Industriales**

---

## 📖 Descripción General

Este dashboard interactivo fue desarrollado como herramienta pedagógica para el aprendizaje del **Procesamiento Digital de Señales (DSP)** en el contexto de comunicaciones e infraestructuras de redes industriales.

Los estudiantes pueden experimentar interactivamente con conceptos fundamentales del procesamiento de señales:
- Muestreo de señales analógicas
- Teorema de Nyquist-Shannon
- Efecto de aliasing
- Cuantificación de amplitud
- Regeneración de señales

---

## 🎯 Objetivos de Aprendizaje

### Conceptos Teóricos
✅ Comprender el proceso de muestreo y su importancia en sistemas digitales  
✅ Dominar el Teorema de Nyquist-Shannon (fs ≥ 2×f)  
✅ Reconocer y entender el fenómeno de aliasing  
✅ Analizar el rol de la cuantificación en sistemas reales  
✅ Comprender la reconstrucción de señales mediante interpolación  

### Habilidades Prácticas
✅ Manipular parámetros en tiempo real (amplitud, frecuencia, muestreo)  
✅ Interpretar gráficos de señales continuas vs discretas  
✅ Aplicar la condición de Nyquist para evitar aliasing  
✅ Analizar la relación entre bits y calidad de reconstrucción  

---

## 🌐 Interfaz del Dashboard

### Panel de Controles (Izquierda)
```
📏 Amplitud         [0.5 - 5.0]  Rango de variación de la onda
📍 Frecuencia       [0.5 - 5.0 Hz]  Componentes de frecuencia
🎚️ Muestreo        [0.5 - 20.0 Hz]  Frecuencia de muestreo (fs)
```

### 🎓 Selector de Escenarios Predefinidos ⭐ NUEVO
```
Selecciona un escenario para cargar automáticamente:
├── 🎵 CD de Audio (44.1 kHz)      - Parámetros reales de música
├── 📞 Telefonía (8 kHz)            - Parámetros de comunicaciones
├── ✅ Nyquist Cumplido             - Caso ideal sin errores
├── ⚠️ Nyquist Límite               - En el borde de la teoría
├── ❌ Aliasing Severo              - Demostración de error
├── 🔍 Sobremuestreo                - Más muestras que lo necesario
└── 🎮 Personalizado                - Controles manuales libres
```

Cada escenario incluye:
- Valores automáticos de amplitud, frecuencia y muestreo
- Descripción pedagógica del caso
- Explicación de qué aprender

👉 **Ver [GUIA_ESCENARIOS.md](GUIA_ESCENARIOS.md) para detalles completos de cada escenario**

### Área de Visualización (Centro)
```
📈 Gráfico 1: Señal continua + Muestras discretas
   • Línea azul: Señal analógica continua
   • Puntos amarillos: Muestras discretas capturadas

⚠️ Gráfico 2: Efecto de aliasing (solo cuando fs < 2f)
   • Línea roja: Frecuencia alias ("fantasma")
   • Demonstra error irreversible por muestreo insuficiente
```

### Panel de Información Nyquist
```
Análisis dinámico:
✅ CORRECTO    - Si fs ≥ 2×f
⚠️ LÍMITE      - Si 1.5×f ≤ fs < 2×f
❌ ALIASING    - Si fs < 1.5×f
```

### Secciones Educativas Expandibles
- **Muestreo**: Concepto, intervalos Ts, ejemplos prácticos
- **Cuantificación**: Niveles, bits, error, SNR
- **Regeneración**: Interpolación sinc, filtros, DAC
- **Proceso Completo**: Cadena A/D-Procesamiento-D/A

---

## 🔬 Conceptos Clave Implementados

### 1️⃣ MUESTREO (Sampling)

**Definición:** Captura de valores discretos de una señal continua a intervalos regulares.

**Fórmula:**
$$x[n] = x(nT_s) = x(n/f_s)$$

**Intervalo de muestreo:**
$$T_s = \frac{1}{f_s} \text{ (segundos)}$$

**Ejemplo práctico - CD de Audio:**
- fs = 44.1 kHz
- Ts ≈ 22.7 microsegundos
- Se capturan 44,100 muestras por segundo
- Rango de frecuencias: 0 - 22.05 kHz (fs/2)

---

### 2️⃣ TEOREMA DE NYQUIST-SHANNON

**Enunciado Fundamental:**
Para poder reconstruir perfectamente una señal analógica a partir de sus muestras:

$$f_s \geq 2 \cdot f_{max}$$

**Interpretación:**
- La frecuencia de muestreo debe ser **al menos el doble** de la frecuencia máxima de la señal
- Frecuencia de Nyquist: $f_N = f_s / 2$
- Es la frecuencia máxima que puede ser representada sin ambigüedad

**Implicaciones:**
- ✅ Cumplida: Reconstrucción exacta posible
- ❌ Violada: Aliasing irreversible

---

### 3️⃣ ALIASING (Distorsión por Submuestreo)

**Causa:** fs < 2×f (violación de Nyquist)

**Efecto:** Una componente de alta frecuencia "disfrazada" como una de baja frecuencia

**Frecuencia Alias (falsa):**
$$f_{alias} = |f - \lfloor f/f_s \rfloor \cdot f_s|$$

**Características:**
- ⚠️ IRREVERSIBLE: No puede eliminarse después
- Genera distorsión permanente en la señal
- Imposible distinguir la verdadera frecuencia

**Ejemplo real:**
- Señal: f = 3 Hz, fs = 2.5 Hz
- Aparece como: f_alias ≈ 0.5 Hz
- Observador cree que es una frecuencia de 0.5 Hz (¡falso!)

---

### 4️⃣ CUANTIFICACIÓN (Discretización de Amplitud)

**Definición:** Conversión de valores reales (precisión infinita) a valores discretos (N bits)

**Niveles de Cuantificación:**
$$L = 2^N$$

| Bits | Niveles | Aplicación | SNR |
|------|---------|------------|-----|
| 8    | 256     | Telefonía  | ~48 dB |
| 16   | 65,536  | **CD Audio** | ~96 dB |
| 24   | 16.7M   | Audio Pro  | ~144 dB |
| 32   | 4.3B    | Studio     | ~192 dB |

**Paso de Cuantificación:**
$$q = \frac{V_{max} - V_{min}}{2^N}$$

**Error de Cuantificación:**
- Rango: $-q/2 \leq \epsilon \leq +q/2$
- RMS: $\sigma = q/\sqrt{12}$
- Tipo: Ruido uniformemente distribuido
- **IRREVERSIBLE**: No se puede recuperar precisión original

**Relación Señal-Ruido (SNR):**
$$SNR \approx 6.02 \times N + 1.76 \text{ dB}$$

---

### 5️⃣ REGENERACIÓN DE SEÑALES

**Requisito:** Teorema de Nyquist cumplido (fs ≥ 2×f)

**Método Teórico - Interpolación Sinc:**
$$x(t) = \sum_{n=-\infty}^{\infty} x[n] \cdot \text{sinc}\left(\pi \frac{t - nT_s}{T_s}\right)$$

donde $\text{sinc}(x) = \frac{\sin(\pi x)}{\pi x}$

**Filtro de Reconstrucción Ideal:**
- Tipo: Paso-bajo ideal
- Frecuencia de corte: fc = fs/2
- Respuesta impulso: función sinc
- Efecto: Interpola perfectamente entre muestras

**Implementación Práctica - DAC (Digital-to-Analog Converter):**
1. **Hold**: Mantiene valor constante durante Ts
2. **DAC**: Convierte código digital → voltaje analógico
3. **Filtro paso-bajo**: Suaviza escalones
4. **Resultado**: Aproximación a la señal original

**Limitaciones Prácticas:**
- Filtros ideales no son realizables
- Latencia en la reconstrucción
- Rizado (ripple) en las transiciones
- Error de cuantificación persiste

---

### 6️⃣ PROCESO COMPLETO A/D → D/A

```
ENTRADA ANALÓGICA
    ↓
[Filtro Anti-Aliasing] → Elimina frecuencias > fs/2
    ↓
[Muestreo S&H] → Captura x[n] a frecuencia fs
    ↓
[ADC Cuantificador] → Discretiza amplitud a N bits
    ↓
DOMINIO DIGITAL
    ↓
[Procesamiento] → Filtros, FFT, algoritmos, compresión
    ↓
[DAC] → Convierte código digital → voltaje
    ↓
[Filtro Anti-Alias Salida] → Suaviza escalonamiento
    ↓
SALIDA ANALÓGICA RECONSTRUIDA
```

**Fuentes de Error Acumulativo:**
1. **Aliasing**: Si fs < 2×f → IRREVERSIBLE
2. **Cuantificación**: Discretización de amplitud
3. **Filtros no-ideales**: Atenuación, fase, rizado
4. **Jitter de muestreo**: Variaciones en Ts
5. **Errores numéricos**: Redondeo en procesamiento

---

## 🎮 Casos de Uso Interactivo

### Caso 1: Nyquist Cumplido ✅
```
Controles:
- Amplitud: 2.0
- Frecuencia: 2.0 Hz
- Muestreo: 5.0 Hz

Observación:
fs = 5 Hz ≥ 2×2 Hz = 4 Hz ✅
→ Reconstrucción exacta posible
→ Muestras amarillas siguen perfectamente la curva azul
```

### Caso 2: Efecto de Aliasing ❌
```
Controles:
- Amplitud: 2.0
- Frecuencia: 4.0 Hz
- Muestreo: 5.0 Hz

Observación:
fs = 5 Hz < 2×4 Hz = 8 Hz ❌
→ Aparece una frecuencia falsa (alias)
→ El gráfico muestra la onda "lenta" que no es real
→ Muestras insuficientes engañan al observador
```

### Caso 3: Límite de Nyquist ⚠️
```
Controles:
- Amplitud: 1.0
- Frecuencia: 2.5 Hz
- Muestreo: 5.0 Hz

Observación:
fs = 5 Hz = 2×2.5 Hz (límite teórico)
→ Apenas suficiente para reconstrucción
→ Muestras mínimas requeridas
→ Riesgo alto si hay variaciones en fs
```

---

## 🧪 Actividades Propuestas en Clase

### Actividad 1: Exploración del Rango de Nyquist
**Objetivo:** Que el estudiante encuentre empíricamente el punto de transición

Instrucciones:
1. Fija frecuencia en 2.0 Hz
2. Incrementa lentamente la frecuencia de muestreo
3. Observa cuándo desaparece el aliasing
4. Verifica que sucede en fs = 4 Hz
5. Prueba diferentes amplitudes (el resultado no cambia)

**Conclusión:** El Nyquist es independiente de la amplitud

---

### Actividad 2: Efecto de Cuantificación (Teórico)
**Objetivo:** Entender la pérdida de precisión por bits limitados

Experimento mental:
- Si usaras 1 bit: 2 niveles (muy burdo)
- Si usaras 4 bits: 16 niveles (limitado)
- Si usaras 8 bits: 256 niveles (aceptable)
- Si usaras 16 bits: 65,536 niveles (CD quality)
- Si usaras 32 bits: 4.3M niveles (profesional)

Con este dashboard (analógico): No hay cuantificación visible
En sistemas reales: Cada más bits = menos ruido = mejor SNR

---

### Actividad 3: Análisis Comparativo
**Objetivo:** Comparar diferentes escenarios de muestreo

Tabla de Resultados:
```
Frecuencia | fs  | Nyquist? | Aliasing? | fAlias    | Apto?
-----------|-----|----------|-----------|-----------|------
1.0 Hz     | 3.0 | ✅ Sí   | ❌ No    | -         | ✅ Sí
2.0 Hz     | 4.0 | ✅ Sí   | ❌ No    | -         | ✅ Sí
3.0 Hz     | 5.0 | ❌ No   | ✅ Sí    | ~2.0 Hz   | ❌ No
5.0 Hz    | 8.0 | ❌ No   | ✅ Sí    | ~3.0 Hz   | ❌ No
```

Conclusión: La regla fs ≥ 2×f es **absolutamente crítica**

---

## 🔧 Tecnología Utilizada

### Backend
- **Python 3.7+** con Flask 3.0.0
- **NumPy 1.24.3** para cálculos matemáticos
- Implementación de:
  - Generación de señales sinusoidales
  - Muestreo discreto
  - Análisis de Nyquist
  - Cálculo de frecuencias alias

### Frontend
- **HTML5 semántico** con estructura clara
- **CSS3 moderno** con gradientes y animaciones
- **JavaScript ES6+** con async/await
- **Plotly.js 2.26.0** para gráficos interactivos

### Arquitectura
- Patrón **MVC**
- API REST con endpoint `/api/calcular`
- Actualización gráfica en tiempo real (<100ms)
- Responsive design (desktop optimizado)

---

## 📚 Recursos Complementarios

### Libros Recomendados
1. **"Discrete-Time Signal Processing" - Oppenheim & Schafer**
   - Capítulo 4: Muestreo de Señales Continuas
   - Teorema de Nyquist-Shannon: páginas 4-5

2. **"Digital Signal Processing" - Proakis & Manolakis**
   - Capítulo 1: Introducción
   - Conversión A/D y D/A: Capítulo 8

3. **"The Scientist and Engineer's Guide to DSP" - Smith**
   - Gratuito online: www.dspguide.com
   - Capítulo 3: ADC and DAC (muy accesible)

### Artículos en Línea
- Wikipedia: Sampling (signal processing)
- MIT OpenCourseWare: Signal Processing
- Khan Academy: Nyquist-Shannon Theorem

### Herramientas Similares
- **MATLAB/Simulink**: Matlab Signal Processing Toolbox
- **SciPy**: Librería Python para DSP
- **GNU Octave**: Alternativa gratuita a MATLAB

---

## 🎓 Evaluación del Aprendizaje

### Cuestionario Conceptual
1. ¿Qué sucede si fs < 2×f?
2. ¿Puedes eliminar aliasing después de ocurrido?
3. ¿La amplitud afecta al Teorema de Nyquist?
4. ¿Cuántos bits necesitas para 1 millón de niveles?
5. ¿Qué es la función sinc en la reconstrucción?

### Ejercicios Prácticos
1. Encuentra 5 configuraciones que cumplan Nyquist
2. Encuentra 5 configuraciones que causen aliasing
3. Calcula fAlias para f=3.5, fs=5
4. Interpreta: SNR de 16 bits = 96 dB
5. Dibuja el diagrama A/D-Procesamiento-D/A

---

## 📞 Soporte Docente

Para dudas o sugerencias sobre el dashboard:
1. Verifica la sección INSTALACION.md
2. Revisa la Consola del Navegador (F12) para errores
3. Intenta recargar la página (Ctrl+R)
4. Contacta al profesor/instructor

---

## 📄 Licencia y Uso

**Licencia:** Libre para fines educativos (CC-BY-SA)

**Atribución:** Dashboard educativo para Comunicaciones y Redes Industriales

**Uso Permitido:**
- ✅ Uso en aulas y laboratorios
- ✅ Distribución a estudiantes
- ✅ Modificaciones para mejora pedagógica
- ✅ Citación en trabajos académicos

**Uso No Permitido:**
- ❌ Uso comercial sin autorización
- ❌ Distribución sin atribución

---

## 🔄 Versión y Cambios

**Versión Actual:** 2.0 (Actualización Educativa Completa)

**Cambios en v2.0:**
- ✨ Documentación exhaustiva de todos los conceptos
- ✨ Secciones expandibles con contenido técnico
- ✨ Ejemplos reales (CD Audio, Telefonía)
- ✨ Formulas matemáticas en LaTeX
- ✨ Guía de instalación simplificada
- ✨ Casos de uso práctico

---

## 🚀 Inicio Rápido

```powershell
# Opción 1: Doble clic (⭐ Recomendado)
Haz doble clic en: ejecutar_dashboard.bat

# Opción 2: Terminal manual
cd dashboard_muestreo
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# Abre en navegador: http://localhost:5000
```

---

**¡Bienvenido al aprendizaje interactivo de Procesamiento Digital de Señales! 🎓📊**

*Creado para: Asignatura Comunicaciones y Redes Industriales*  
*Fecha: 2024*  
*Institución: Educativo*
