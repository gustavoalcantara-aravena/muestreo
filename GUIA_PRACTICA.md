# 📝 Guía Práctica: Ejercicios y Experimentos

## 📋 Tabla de Contenidos
1. [Ejercicios Básicos](#ejercicios-básicos)
2. [Casos de Estudio Reales](#casos-de-estudio-reales)
3. [Experimentos Progresivos](#experimentos-progresivos)
4. [Problemas Desafiantes](#problemas-desafiantes)
5. [Soluciones](#soluciones)

---

## Ejercicios Básicos

### Ejercicio 1.1: Encontrar el Punto Crítico de Nyquist ⭐⭐☆

**Objetivo:** Encontrar empíricamente dónde empieza el aliasing

**Instrucciones:**
1. Abre el dashboard
2. Configura: Amplitud = 1.0, Frecuencia = 2.0 Hz
3. Comienza con Muestreo = 3.0 Hz
4. Aumenta **lentamente** (0.1 Hz a la vez) la frecuencia de muestreo
5. Observa cuándo desaparece la frecuencia alias

**Observaciones Esperadas:**
- Con fs = 3.0: Ves aliasing (la línea roja aparece)
- Con fs = 3.9: Aún hay aliasing
- Con fs = 4.0: ¡Exactamente 2×f! Aliasing desaparece ✅
- Con fs > 4.0: Sin aliasing

**Conclusión:**
El punto crítico es exactamente cuando **fs = 2×f**

**¿Por qué importa?**
Confirma experimentalmente el Teorema de Nyquist

---

### Ejercicio 1.2: Amplitud No Afecta Nyquist ⭐⭐☆

**Objetivo:** Demostrar que la amplitud es irrelevante para aliasing

**Instrucciones:**
1. Mantén: Frecuencia = 3.0 Hz, Muestreo = 5.0 Hz
2. Prueba con Amplitud = 0.5:
   - ¿Hay aliasing? SÍ (fs < 2×f)
   - ¿A qué frecuencia? Calcula
3. Cambia Amplitud = 5.0:
   - ¿Hay aliasing? SÍ (exactamente igual)
   - ¿A qué frecuencia? Exactamente igual

**Observaciones:**
- Aliasing ocurre o no ocurre **independientemente** de amplitud
- Solo depende de la relación f/fs

**Fórmula (verificado):**
$$f_{alias} = |f - \lfloor f/f_s \rfloor \cdot f_s|$$
(No incluye amplitud)

---

### Ejercicio 1.3: El Efecto del Sobremuestreo ⭐⭐☆

**Objetivo:** Ver cómo más muestras mejoran la precisión visual

**Instrucciones:**
1. Mantén: Amplitud = 2.0, Frecuencia = 1.5 Hz
2. Configura Muestreo = 3.0 Hz (justo Nyquist)
   - Observa: Puntos amarillos espaciados
3. Aumenta Muestreo = 10.0 Hz
   - Observa: Muchos más puntos amarillos
   - ¿Se ve la onda azul más claramente?

**Patrón:**
- Menos muestras: Forma "borrosa"
- Más muestras: Forma "clara"

**Nota teórica:**
Teóricamente ambos pueden reconstruir igual, pero visualmente (y en práctica) más muestras dan mejor aproximación.

---

## Casos de Estudio Reales

### Caso 2.1: CD de Audio 🎵

**Especificaciones del CD:**
- fs = 44.1 kHz
- Bits = 16
- Canales = 2 (estéreo)
- Rango de frecuencias de la música: 20 Hz - 20 kHz (oído humano)

**Pregunta 1:** ¿Cumple el teorema de Nyquist?
```
Necesario: fs ≥ 2 × 20 kHz = 40 kHz
Actual: 44.1 kHz
Resultado: ✅ SÍ, lo cumple (con 4.1 kHz de margen)
```

**Pregunta 2:** ¿Cuántos datos ocupa 1 minuto?
```
Cálculo:
- Muestras por segundo: 44.1k × 2 canales = 88.2k
- Bytes por muestra: 2 bytes (16 bits)
- Bytes por segundo: 88.2k × 2 = 176.4 kB/s
- 1 minuto (60 seg): 176.4 × 60 = 10.584 MB
```

**Pregunta 3:** ¿Y la cuantificación?
```
- 16 bits = 65,536 niveles
- SNR ≈ 6.02 × 16 + 1.76 = 98.3 dB ✅
- Excelente para audio (imperceptible para humanos)
```

**Verificación en Dashboard:**
1. Calibra a: Amplitud = 1.0, Frecuencia = 1.0 Hz
2. Configura: Muestreo = 44.1 (simula, usa escala 1:1000)
3. Observa: ✅ No hay aliasing, perfecto
4. Intenta: Frecuencia = 20 Hz, Muestreo = 44.1
5. Observa: Aún sin aliasing (20 Hz × 2 = 40 Hz ≤ 44.1)

---

### Caso 2.2: Telefonía 📞

**Especificaciones de llamada telefónica:**
- fs = 8 kHz (equivalente a 8,000 muestras/segundo)
- Bits = 8
- Rango de voz: 300 Hz - 3.4 kHz

**Pregunta 1:** ¿Es suficiente?
```
Necesario: fs ≥ 2 × 3.4 kHz = 6.8 kHz
Actual: 8 kHz
Resultado: ✅ SÍ, lo cumple
```

**Pregunta 2:** ¿Por qué no usa 16 bits como CD?
```
Razones económicas/técnicas:
- 8 bits ocupa mitad de datos (importante para redes)
- SNR ≈ 6.02×8 + 1.76 = 50 dB (suficiente para voz)
- Voz es más "perdonadora" que música
- Bandwidth limitado en líneas telefónicas
```

**Pregunta 3:** Si intento comunicar música por teléfono...
```
Problema: Música tiene componentes hasta 20 kHz
Con fs = 8 kHz: Solo puedo comunicar hasta 4 kHz ❌
Resultado: Música suena "apagada", sin agudos

Solución: Usar fs más alta (ej. 48 kHz)
Costo: 6× más datos de transmisión
```

**Verificación en Dashboard:**
1. Ajusta: Amplitud = 1.0, Frecuencia = 3.0 Hz (=3 kHz en escala real)
2. Configura: Muestreo = 8.0 (=8 kHz en escala real)
3. Observa: ✅ Sin aliasing
4. Intenta: Frecuencia = 5.0 Hz (=5 kHz - fuera de rango de voz)
5. Observa: ❌ Aliasing severo (5 kHz no cabe en 4 kHz de ancho de banda)

---

### Caso 2.3: Señales de Sensores Industriales 🏭

**Especificación de sensor de temperatura:**
- Rango: -50°C a +150°C (mapeo 0V a 5V)
- Variación máxima esperada: Cambios cada ~10 segundos
- Frecuencia máxima: ~0.1 Hz

**Pregunta:** ¿Qué fs debo usar?
```
Análisis:
1. fmax = 0.1 Hz
2. fmin requerida = 2 × 0.1 = 0.2 Hz
3. Recomendado (con margen): 0.5-1 Hz
4. Típico industrial: 10-100 Hz (mucho más que necesario)

Razones para usar más:
- Margen de seguridad
- Detectar ruido
- Respuesta rápida si situación cambia
```

**¿Qué bits necesito?**
```
Aplicación: Industrial (no crítica)
Mínimo: 8 bits (256 niveles)
Típico: 12 bits (4,096 niveles, ±0.06°C)
Alta precisión: 16 bits (65,536 niveles)
```

---

## Experimentos Progresivos

### Experimento 3.1: Transición Gradual a Aliasing ⭐⭐⭐

**Objetivo:** Observar cómo cambia gradualmente la frecuencia alias

**Setup Inicial:**
- Amplitud = 2.0
- Frecuencia = 5.0 Hz
- Muestreo = 10.0 Hz (sin aliasing aún)

**Procedimiento:**
1. **Paso 1:** Muestreo = 9.0 Hz
   - ¿Hay aliasing? Calcula: |5 - ⌊5/9⌋×9| = |5-0| = 5 Hz (no, aún no)

2. **Paso 2:** Muestreo = 8.0 Hz  
   - ¿Hay aliasing? Calcula: |5 - ⌊5/8⌋×8| = |5-0| = 5 Hz (no)

3. **Paso 3:** Muestreo = 7.5 Hz
   - ¿Hay aliasing? **SÍ** (5 > 3.75, donde 3.75 = fs/2)
   - Frecuencia alias = |5 - 2.5| = 2.5 Hz

4. **Paso 4:** Muestreo = 6.0 Hz
   - Frecuencia alias = |5 - 1×6| = |5 - 6| = 1 Hz

5. **Paso 5:** Muestreo = 5.0 Hz
   - Frecuencia alias = |5 - 1×5| = 0 Hz (desaparece)

**Observación Clave:**
Conforme baja fs, la frecuencia alias se acerca a 0, luego "desaparece" cuando fs ≤ f.

---

### Experimento 3.2: Búsqueda de Frecuencia Alias ⭐⭐⭐

**Objetivo:** Predecir antes de ver, luego verificar

**Problema Planteado:**
"Tengo una señal de 3.5 Hz que muestreo a 5 Hz. ¿Qué frecuencia alias voy a ver?"

**Solución Teórica:**
```
f = 3.5 Hz, fs = 5 Hz
n = ⌊f/fs⌋ = ⌊3.5/5⌋ = 0
f_alias = |3.5 - 0×5| = 3.5 Hz

Pero espera... 3.5 < fs/2? NO, porque fs/2 = 2.5
Mejor fórmula: f_alias = |f - fs| si f > fs/2
f_alias = |3.5 - 5| = 1.5 Hz ✅
```

**Verificación en Dashboard:**
1. Amplitud = 1.0
2. Frecuencia = 3.5 Hz
3. Muestreo = 5.0 Hz
4. Observa el gráfico: ¿Cuál es la frecuencia alias?
5. Compara con predicción: 1.5 Hz ✅

---

### Experimento 3.3: Límite Teórico vs Práctico ⭐⭐⭐

**Objetivo:** Entender por qué fs = 2f es un mínimo, no recomendado

**Teoría:**
- fs = 2f: Limite exacto, teóricamente funciona
- fs > 2f: Zona segura, recomendada

**Procedimiento:**
1. Amplitud = 1.0, Frecuencia = 2.0 Hz
2. Prueba con:
   - Muestreo = 3.9 Hz: Hay aliasing
   - Muestreo = 4.0 Hz: Frontera crítica
   - Muestreo = 4.1 Hz: Sin aliasing ✅

**Observación Práctica:**
Aunque 4.0 Hz es teóricamente suficiente, en práctica:
- Ruido puede causar problemas
- Filtros reales no son perfectos
- Se recomienda: fs ≥ 2.5-3 × f

**Analógía:** 
Es como decir "necesitas $100 para comer un mes"
- Exacto: $100 (sin margen de error)
- Prudente: $120-150 (margen de seguridad)

---

## Problemas Desafiantes

### Problema 4.1: Sistema Multiniveles ⭐⭐⭐⭐

**Escenario:**
Un sistema de procesamiento tiene múltiples componentes de frecuencias:
- Componente 1: f₁ = 1.0 Hz (fundamental)
- Componente 2: f₂ = 3.0 Hz (armónico)
- Componente 3: f₃ = 5.0 Hz (sobretono)
- Ruido: hasta 7.0 Hz

**Pregunta:** ¿Cuál debe ser la fs mínima?

**Solución:**
```
Teorema de Nyquist: fs ≥ 2 × fmax
fmax = máx(1.0, 3.0, 5.0, 7.0) = 7.0 Hz
fs_mín = 2 × 7.0 = 14.0 Hz

Recomendado: 15-20 Hz (con margen)
```

**Verificación:**
1. En dashboard, prueba con cada frecuencia
2. Muestreo = 14 Hz: Debería estar justo en el límite
3. Muestreo = 13 Hz: Debería dar aliasing

---

### Problema 4.2: Reconstrucción Imperfecta ⭐⭐⭐⭐

**Escenario (Teórico):**
Aunque cumplas Nyquist, la reconstrucción no es perfecta porque:
1. Cuantificación introduce ruido: ~0.01 (16 bits)
2. Filtro no es ideal: Atenuación ~1-5%
3. Jitter de muestreo: ~0.1% variación en Ts
4. Redondeo numérico: ~0.01%

**Pregunta:** ¿Cuál es el error total aproximado?

**Cálculo (orden de magnitud):**
```
Error total ≈ √(errores²) (suma cuadrática)
           ≈ √(0.01² + 0.02² + 0.001² + 0.0001²)
           ≈ √(0.0001 + 0.0004 + 0.000001 + 0.00000001)
           ≈ √0.000501
           ≈ 0.0224 ≈ 2.2%

Conclusion: Aunque teórico es perfecto, práctico ~2% error total
```

---

### Problema 4.3: Optimización de Costos ⭐⭐⭐⭐

**Escenario Industrial:**
Debes diseñar un sistema de adquisición de datos:
- Banda de interés: 0-500 Hz
- Presupuesto para ADC: Limitado
- Requerimiento de SNR: ≥ 60 dB

**Opciones disponibles:**
```
Opción A: fs=2000 Hz, 8 bits  → Costo: $100, SNR: ~50 dB ❌
Opción B: fs=2000 Hz, 12 bits → Costo: $300, SNR: ~72 dB ✅
Opción C: fs=3000 Hz, 10 bits → Costo: $250, SNR: ~61 dB ✅
Opción D: fs=5000 Hz, 8 bits  → Costo: $200, SNR: ~50 dB ❌
```

**Análisis:**
1. **Nyquist:** fs ≥ 2×500 = 1000 Hz → Todas cumplen ✅
2. **SNR:** Necesito ≥ 60 dB:
   - SNR ≈ 6.02N + 1.76
   - 60 = 6.02N + 1.76 → N ≥ 9.6 bits (necesito ≥10 bits)

3. **Mejor relación costo-beneficio:** Opción C ($250, SNR=61 dB)

---

## Soluciones

### Soluciones Ejercicios Básicos

**Ejercicio 1.1 - Respuesta:**
El punto crítico es exactamente **fs = 2×f**
- Teóricamente predicho: 4.0 Hz
- Experimentalmente observado: ~4.0 Hz ✅

**Ejercicio 1.2 - Respuesta:**
Aliasing es independiente de amplitud, solo depende de fs/f

**Ejercicio 1.3 - Respuesta:**
Más muestras = mejor aproximación visual
Aunque teóricamente igual, prácticamente diferente

---

### Soluciones Casos Reales

**Caso 2.1 - Respuestas:**
1. ✅ Cumple Nyquist (44.1 > 40 kHz)
2. 1 minuto ≈ 10.6 MB
3. SNR ≈ 98 dB (excelente)

**Caso 2.2 - Respuestas:**
1. ✅ Cumple Nyquist (8 > 6.8 kHz)
2. Usa 8 bits por costo/ancho de banda
3. Música suena "apagada" sin agudos (>4 kHz)

**Caso 2.3 - Respuestas:**
1. fs_mín = 0.2 Hz, pero recomendado ≥ 1 Hz
2. Típicamente se usa 10-100 Hz industrial
3. Bits: 12-16 para precisión de ~0.1°C

---

### Soluciones Experimentos

**Experimento 3.1:**
El patrón es: conforme baja fs, alias se acerca a 0, luego desaparece

**Experimento 3.2:**
Predicción: 1.5 Hz ✅
Observación en dashboard: Confirma predicción

**Experimento 3.3:**
fs = 2f es límite teórico, pero recomendado fs ≥ 2.5-3f por robustez

---

### Soluciones Problemas Desafiantes

**Problema 4.1:**
fs_mín = 14 Hz, recomendado 15-20 Hz

**Problema 4.2:**
Error total práctico ≈ 2-3% (aunque teórico es 0%)

**Problema 4.3:**
Mejor opción: **Opción C** (fs=3000 Hz, 10 bits, costo=$250, SNR=61 dB)

---

## 📊 Checklist de Comprensión

Antes de continuar, verifica que comprendas:

- [ ] ¿Qué es el muestreo? (captura discreta de señal continua)
- [ ] ¿Cuál es la regla de Nyquist? (fs ≥ 2×f)
- [ ] ¿Qué es aliasing? (error cuando fs < 2×f)
- [ ] ¿Aliasing es reversible? (NO, irreversible)
- [ ] ¿La amplitud afecta Nyquist? (NO)
- [ ] ¿Cuántos bits para CD? (16 bits)
- [ ] ¿Cuál es SNR para 16 bits? (~96 dB)
- [ ] ¿Cómo se regenera señal? (interpolación sinc/DAC)
- [ ] ¿Un filtro ideal existe? (NO, solo aproximación)
- [ ] ¿Más bits = mejor? (SÍ, hasta punto de rendimiento)

Si respondiste SÍ a todos → **¡Excelente, dominas los conceptos!** 🎉

---

**¡Felicidades por completar estos ejercicios! 🚀📊**

*Recuerda: La práctica experimental con el dashboard es más valiosa que solo la teoría. ¡Experimenta libremente!*
