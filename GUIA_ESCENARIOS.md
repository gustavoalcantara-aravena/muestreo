# 🎓 Guía de Escenarios Predefinidos

## ¿Qué son los Escenarios?

Los escenarios predefinidos son **configuraciones automáticas** que permiten a los estudiantes explorar casos educativos específicos sin tener que ajustar manualmente todos los sliders.

**Selecciona un escenario → Los valores se cargan automáticamente → Observa el comportamiento en los gráficos.**

---

## 📚 Los 6 Escenarios Educativos

### 1️⃣ 🎵 CD de Audio (44.1 kHz)

**Configuración:**
- Amplitud: 1.0
- Frecuencia: 0.5 Hz (equivalente a ~20 kHz en escala real)
- Frecuencia Muestreo: 10 Hz (equivalente a ~44.1 kHz)

**Lo que Aprenderás:**
- Parámetros reales de CD de audio
- Por qué 44.1 kHz es suficiente para música
- Cumplimiento de Nyquist en aplicaciones prácticas

**Observaciones en el Dashboard:**
- Panel Nyquist muestra: ✅ **CORRECTO**
- Muestras amarillas distribuidas perfectamente
- No hay gráfico de aliasing (no hay error)

**Contexto Educativo:**
El oído humano puede percibir frecuencias hasta ~20 kHz. Por Nyquist:
$$f_s \geq 2 \times 20 = 40 \text{ kHz}$$

Los CDs usan 44.1 kHz, que proporciona un margen del 10% sobre el mínimo. Este es un ejemplo real perfecto del Teorema de Nyquist en acción.

---

### 2️⃣ 📞 Telefonía (8 kHz)

**Configuración:**
- Amplitud: 1.0
- Frecuencia: 1.0 Hz (equivalente a ~3.4 kHz en escala real)
- Frecuencia Muestreo: 5 Hz (equivalente a ~8 kHz)

**Lo que Aprenderás:**
- Parámetros de sistemas de telecomunicaciones
- Por qué telefonía usa menos muestras que música
- Relación entre ancho de banda y calidad

**Observaciones en el Dashboard:**
- Panel Nyquist muestra: ✅ **CORRECTO**
- Margen muy ajustado (solo 1.2× el mínimo)
- Muestras suficientes pero sin mucho margen

**Contexto Educativo:**
La voz humana ocupa principalmente entre 300 Hz y 3.4 kHz. Por Nyquist:
$$f_s \geq 2 \times 3.4 = 6.8 \text{ kHz}$$

La telefonía usa 8 kHz, minimizando ancho de banda (importante para economizar en redes). Comparar con CD audio muestra el trade-off calidad vs. eficiencia.

**Pregunta Educativa:** *¿Por qué la música en una llamada telefónica se escucha "extraña"?*
Respuesta: Porque 8 kHz solo puede capturar hasta 4 kHz, perdiendo los agudos musicales.

---

### 3️⃣ ✅ Nyquist Cumplido

**Configuración:**
- Amplitud: 2.0
- Frecuencia: 2.0 Hz
- Frecuencia Muestreo: 5.0 Hz

**Lo que Aprenderás:**
- El caso ideal donde Nyquist se cumple con holgura
- Distribución perfecta de muestras
- Cómo se ve una "reconstrucción correcta"

**Observaciones en el Dashboard:**
- Panel Nyquist muestra: ✅ **CORRECTO**
- Relación: fs = 2.5 × f (25% arriba del mínimo)
- Puntos amarillos perfectamente alineados con la curva azul
- **NO hay aliasing**

**Experimento Educativo:**
1. Carga este escenario
2. Observa cómo los puntos amarillos capturan perfectamente la onda
3. Imagina conectando los puntos: obtendrías casi la onda original
4. Compara con otros escenarios

**Fórmula Verificada:**
$$f_s = 5.0 \text{ Hz} \geq 2 \times 2.0 = 4.0 \text{ Hz} \checkmark$$

---

### 4️⃣ ⚠️ Nyquist Límite

**Configuración:**
- Amplitud: 2.0
- Frecuencia: 2.5 Hz
- Frecuencia Muestreo: 5.0 Hz

**Lo que Aprenderás:**
- El punto crítico donde Nyquist apenas se cumple
- Por qué "apenas suficiente" es riesgoso
- La importancia de tener margen de seguridad

**Observaciones en el Dashboard:**
- Panel Nyquist muestra: ⚠️ **LÍMITE**
- Relación: fs = 2.0 × f (exactamente en el borde)
- Puntos amarillos apenas suficientes
- Muy pocas muestras por ciclo

**¿Por qué es riesgoso?**
- Cualquier variación en fs causaría aliasing
- En práctica: ruido, jitter, errores pueden violar Nyquist
- Se necesita margen de seguridad

**Contexto Real:**
En aplicaciones reales, nunca se diseña en el exacto límite. Se usa:
$$f_s \geq 2.5 \text{ a } 3.0 \times f_{max}$$

para tener margen de seguridad.

**Pregunta Educativa:** *¿Qué pasaría si fs bajara a 4.9 Hz?*
Respuesta: Violaría Nyquist y aparecería aliasing.

---

### 5️⃣ ❌ Aliasing Severo

**Configuración:**
- Amplitud: 2.0
- Frecuencia: 4.0 Hz
- Frecuencia Muestreo: 5.0 Hz

**Lo que Aprenderás:**
- Cómo aparece el aliasing cuando Nyquist se viola
- El concepto de "frecuencia fantasma"
- Por qué es IRREVERSIBLE

**Observaciones en el Dashboard:**
- Panel Nyquist muestra: ❌ **ALIASING**
- Aparece **segundo gráfico** rojo con la "falsa" frecuencia
- Puedes ver gráficamente el error
- Los puntos amarillos NO siguen la curva azul

**¿Qué Está Pasando?**
```
Realidad:       Frecuencia = 4.0 Hz
Muestreo:       fs = 5.0 Hz (insuficiente)
Lo que se ve:   Frecuencia alias ≈ 1.0 Hz (¡FALSO!)
```

**Cálculo de la Frecuencia Alias:**
$$f_{alias} = |f - f_s| = |4.0 - 5.0| = 1.0 \text{ Hz}$$

**Por qué es IRREVERSIBLE:**
Después del muestreo, **no hay forma de saber** si lo que ves es:
- Una señal de 1 Hz real, o
- Una señal de 4 Hz submuestreada

Una vez ocurrido el aliasing, la información se perdió permanentemente.

**Experimento:**
1. Carga este escenario
2. Observa el gráfico rojo (alias)
3. Ahora intenta "eliminarlo" → No puedes
4. Esto demuestra por qué Nyquist es **crítico**

---

### 6️⃣ 🔍 Sobremuestreo

**Configuración:**
- Amplitud: 1.5
- Frecuencia: 1.0 Hz
- Frecuencia Muestreo: 20.0 Hz

**Lo que Aprenderás:**
- Qué es sobremuestreo (oversampling)
- Por qué las industrias "sobreestiman" fs
- Ventajas de tener muchas muestras

**Observaciones en el Dashboard:**
- Panel Nyquist muestra: ✅ **CORRECTO**
- Relación: fs = 20 × f (¡20 veces lo mínimo requerido!)
- Puntos amarillos **muy densos**, casi forman una línea continua
- Casi no se ve diferencia entre la curva y los puntos

**Ventajas del Sobremuestreo:**
1. **Robustez:** Incluso si fs baja, aún cumple Nyquist
2. **Mejor reconstrucción:** Muchos más puntos para interpolar
3. **Margen de seguridad:** Protección contra jitter, ruido
4. **Flexibilidad:** Permite decimación posterior

**Ejemplo Real:**
- Cámaras de audio profesionales a veces usan 192 kHz (4× CD)
- Sistemas médicos de monitoreo usan fs muy altas
- Equipos científicos sobremuestrean para datos robustos

**Costo-Beneficio:**
- **Ventaja:** Mejor calidad, más robusto
- **Desventaja:** Más datos, más procesamiento, más potencia

**Pregunta Educativa:** *¿Cuándo elegirías sobremuestreo vs. muestreo mínimo?*

---

### 7️⃣ 🎮 Personalizado (Manual)

**Configuración:**
- Amplitud: 1.0
- Frecuencia: 1.0 Hz
- Frecuencia Muestreo: 10.0 Hz

**Lo que Es:**
No es un escenario educativo predefinido, sino una invitación a experimentar libremente.

**Cómo Usarlo:**
1. Selecciona este escenario
2. Desactiva automáticamente cualquier restricción
3. Ajusta manualmente los sliders como prefieras
4. Experimenta, juega, descubre

**Actividades Recomendadas:**
- Busca exactamente dónde empieza el aliasing
- Prueba valores decimales (0.7, 3.3, etc.)
- Intenta encontrar la frecuencia alias teórica antes de verla
- Crea tu propio "caso de estudio"

---

## 🎯 Actividades Educativas con Escenarios

### Actividad 1: Comparación de Aplicaciones Reales

**Objetivo:** Entender por qué diferentes aplicaciones usan diferentes fs

**Procedimiento:**
1. Carga escenario "CD Audio" → Observa
2. Carga escenario "Telefonía" → Compara
3. Responde:
   - ¿Cuál tiene más muestras? ¿Por qué?
   - ¿Cuál ocupa más datos? ¿Cuál es más eficiente?

**Conclusión:**
CD necesita calidad → sobremuestrea
Telefonía necesita eficiencia → submuestrea (respecto a CD)

---

### Actividad 2: Descubrimiento del Punto Crítico

**Objetivo:** Encontrar experimentalmente dónde empieza el aliasing

**Procedimiento:**
1. Carga escenario "Nyquist Cumplido" → Panel dice ✅
2. Carga escenario "Nyquist Límite" → Panel dice ⚠️
3. Carga escenario "Aliasing Severo" → Panel dice ❌
4. Manualmente, intenta encontrar la transición
5. Calcula teóricamente dónde debería estar

---

### Actividad 3: Visualización de Irreversibilidad

**Objetivo:** Demostrar por qué aliasing es irreversible

**Procedimiento:**
1. Carga escenario "Aliasing Severo"
2. Observa: gráfico rojo de alias
3. Pregunta: ¿Puedo saber si es realmente 1 Hz o 4 Hz muestreado?
4. Respuesta: ¡NO! Los datos se perdieron

---

### Actividad 4: Robustez vs. Eficiencia

**Objetivo:** Entender el trade-off entre margen de seguridad y costo

**Procedimiento:**
1. Compara "Nyquist Límite" vs. "Sobremuestreo"
2. ¿Cuál es más robusto? ¿Cuál es más eficiente?
3. Diseña un sistema para tu aplicación favorita

---

## 📊 Tabla Resumen de Escenarios

| Escenario | f (Hz) | fs (Hz) | fs/2f | Estado | Caso Real |
|-----------|--------|--------|-------|--------|-----------|
| CD Audio | 0.5 | 10.0 | 10.0 | ✅ Cumplido | Música |
| Telefonía | 1.0 | 5.0 | 2.5 | ✅ Cumplido | Voz |
| Nyquist OK | 2.0 | 5.0 | 1.25 | ✅ Cumplido | Ideal |
| Nyquist Límite | 2.5 | 5.0 | 1.0 | ⚠️ Límite | Crítico |
| Aliasing | 4.0 | 5.0 | 0.625 | ❌ Alias | Error |
| Sobremuestreo | 1.0 | 20.0 | 10.0 | ✅ Robusto | Profesional |
| Manual | Variable | Variable | Variable | - | Exploración |

---

## 💡 Consejos para Profesores

### Cómo Usar en Clase

1. **Introducción (5 min):** Muestra "CD Audio" vs. "Telefonía"
   - Explica por qué son diferentes
   - Conecta con conocimiento previo

2. **Demostración (10 min):** Carga "Aliasing Severo"
   - Proyecta en pantalla
   - Muestra el gráfico rojo
   - Explica la irreversibilidad

3. **Experimentación (20 min):** Estudiantes usan escenarios
   - Seleccionan, observan, predicen
   - Completan cuestionario

4. **Conclusión (5 min):** Discute hallazgos
   - ¿Qué aprendiste del escenario X?
   - ¿Cómo lo aplicarías?

### Cuestionarios Sugeridos

**Escenario CD Audio:**
- ¿Por qué 44.1 kHz y no 40 kHz?
- ¿Cambiaría para audio de 8 kHz máximo?

**Escenario Telefonía:**
- ¿Suena diferente a CD? ¿Por qué?
- ¿Cuál es la ventaja de usar 8 kHz?

**Escenario Aliasing:**
- ¿Cómo se llama el efecto rojo?
- ¿Se puede eliminar después?

---

## 📝 Experimento de Estudiante: Crear Tu Propio Escenario

**Objetivo:** Diseñar un escenario para una aplicación propia

**Pasos:**
1. Elige una aplicación: ¿Audio? ¿Video? ¿Sensor?
2. Investiga: ¿Cuál es la frecuencia máxima?
3. Calcula: ¿Cuál debería ser fs?
4. Experimenta: Carga "Personalizado" y ajusta
5. Documenta: ¿Cumple Nyquist? ¿Margen?

**Aplicaciones Sugeridas:**
- Acelerómetro de smartphone (200-500 Hz)
- Electrocardiograma (300-1000 Hz)
- Video (15-60 Hz)
- Radar (kHz-MHz)

---

## 🎉 Conclusión

Los escenarios permiten:
- ✅ Aprendizaje activo (experimentación)
- ✅ Visualización directa (gráficos)
- ✅ Casos reales (CD, telefonía)
- ✅ Exploración libre (personalizado)

**Úsalos como herramienta pedagógica para que tus estudiantes realmente entiendan el Teorema de Nyquist.**

---

*Guía de Escenarios - Dashboard Educativo v2.1*  
*Comunicaciones y Redes Industriales*
