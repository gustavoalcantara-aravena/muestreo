/**
 * Script Principal: Dashboard Educativo de Muestreo
 * Teorema de Nyquist-Shannon - Procesamiento Digital de Señales
 * 
 * Funcionalidades:
 * - Actualización en tiempo real de sliders
 * - Comunicación con backend Flask
 * - Visualización interactiva con Plotly.js
 * - Detección automática de aliasing
 */

// ===================================================
// VARIABLES GLOBALES
// ===================================================

let valorActualAmplitud = 1.0;
let valorActualFrecuencia = 1.0;
let valorActualFs = 10.0;

// Colores para consistencia visual
const COLORES = {
    continua: '#667eea',
    muestras: '#ffc107',
    alias: '#dc3545',
    correcto: '#28a745',
    limite: '#ffc107',
    aliasing: '#dc3545'
};

// ===================================================
// ESCENARIOS PREDEFINIDOS
// ===================================================

const ESCENARIOS = {
    'cd-audio': {
        nombre: '🎵 CD de Audio (44.1 kHz)',
        amplitud: 1.0,
        frecuencia: 0.5,
        fs: 10.0,
        descripcion: 'Simulación de CD de Audio: frecuencia máxima ~20 kHz. El dashboard escala a 0.5 Hz (equivalente a 20 kHz en escala 1:40,000). Frecuencia de muestreo: 10 Hz (equivalente a 44.1 kHz). <strong>Nyquist cumplido ✅</strong>'
    },
    'telefonia': {
        nombre: '📞 Telefonía (8 kHz)',
        amplitud: 1.0,
        frecuencia: 1.0,
        fs: 5.0,
        descripcion: 'Telefonía estándar: frecuencia de voz máxima ~3.4 kHz escalada a 1 Hz. Frecuencia de muestreo: 5 Hz (equivalente a 8 kHz). <strong>Nyquist cumplido ✅</strong> pero con margen mínimo.'
    },
    'nyquist-cumplido': {
        nombre: '✅ Nyquist Cumplido',
        amplitud: 2.0,
        frecuencia: 2.0,
        fs: 5.0,
        descripcion: 'Caso ideal: f = 2.0 Hz, fs = 5.0 Hz. Se cumple exactamente fs = 2.5×f > 2×f. <strong>Muestras perfectamente distribuidas ✅</strong> sin aliasing. Observa cómo los puntos amarillos capturan la onda azul.'
    },
    'nyquist-limite': {
        nombre: '⚠️ Nyquist Límite',
        amplitud: 2.0,
        frecuencia: 2.5,
        fs: 5.0,
        descripcion: 'En el límite teórico: f = 2.5 Hz, fs = 5.0 Hz. Exactamente fs = 2×f (límite). <strong>Apenas suficiente ⚠️</strong> para reconstrucción teórica, pero muy riesgoso en práctica. Pequeñas variaciones causarían aliasing.'
    },
    'aliasing-severo': {
        nombre: '❌ Aliasing Severo',
        amplitud: 2.0,
        frecuencia: 4.0,
        fs: 5.0,
        descripcion: 'Violación seria de Nyquist: f = 4.0 Hz, fs = 5.0 Hz. Se viola porque fs < 2×f. <strong>Aliasing visible ❌</strong> en gráfico rojo: aparece frecuencia falsa. Este es un error <strong>IRREVERSIBLE</strong>.'
    },
    'sobremuestreo': {
        nombre: '🔍 Sobremuestreo',
        amplitud: 1.5,
        frecuencia: 1.0,
        fs: 20.0,
        descripcion: 'Sobremuestreo: f = 1.0 Hz, fs = 20.0 Hz (20× la mínima requerida). <strong>Muchas más muestras ✅</strong> que lo necesario. Los puntos amarillos forman casi una línea continua. Proporciona gran robustez y mejor reconstrucción.'
    },
    'personalizado': {
        nombre: '🎮 Personalizado (Manual)',
        amplitud: 1.0,
        frecuencia: 1.0,
        fs: 10.0,
        descripcion: 'Ajusta los sliders manualmente para experimentar con diferentes valores y explorar el comportamiento de muestreo y Nyquist.'
    }
};

// ===================================================
// INICIALIZACIÓN
// ===================================================

/**
 * Carga un escenario predefinido y actualiza los sliders
 */
function cargarEscenario(idEscenario) {
    if (!idEscenario || !ESCENARIOS[idEscenario]) {
        // Limpiar descripción si no hay escenario seleccionado
        document.getElementById('descripcion-escenario').innerHTML = '';
        return;
    }
    
    const escenario = ESCENARIOS[idEscenario];
    
    // Actualizar sliders
    document.getElementById('amplitud').value = escenario.amplitud;
    document.getElementById('frecuencia').value = escenario.frecuencia;
    document.getElementById('frecuencia-muestreo').value = escenario.fs;
    
    // Actualizar valores globales
    valorActualAmplitud = escenario.amplitud;
    valorActualFrecuencia = escenario.frecuencia;
    valorActualFs = escenario.fs;
    
    // Actualizar valores mostrados
    actualizarValorMostrado('amplitud', escenario.amplitud);
    actualizarValorMostrado('frecuencia', escenario.frecuencia);
    actualizarValorMostrado('fs', escenario.fs);
    
    // Mostrar descripción
    document.getElementById('descripcion-escenario').innerHTML = escenario.descripcion;
    
    // Actualizar gráfico
    console.log(`📚 Escenario cargado: ${escenario.nombre}`);
    actualizarGrafico();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard inicializado');
    
    // Obtener elementos del DOM
    const sliderAmplitud = document.getElementById('amplitud');
    const sliderFrecuencia = document.getElementById('frecuencia');
    const sliderFs = document.getElementById('frecuencia-muestreo');
    const btnActualizar = document.getElementById('btn-actualizar');
    
    // Eventos de sliders
    sliderAmplitud.addEventListener('input', function() {
        valorActualAmplitud = parseFloat(this.value);
        actualizarValorMostrado('amplitud', valorActualAmplitud);
        actualizarGrafico();
    });
    
    sliderFrecuencia.addEventListener('input', function() {
        valorActualFrecuencia = parseFloat(this.value);
        actualizarValorMostrado('frecuencia', valorActualFrecuencia);
        actualizarGrafico();
    });
    
    sliderFs.addEventListener('input', function() {
        valorActualFs = parseFloat(this.value);
        actualizarValorMostrado('fs', valorActualFs);
        actualizarGrafico();
    });
    
    // Botón actualizar
    btnActualizar.addEventListener('click', actualizarGrafico);
    
    // Selector de escenarios
    const selectorEscenarios = document.getElementById('selector-escenarios');
    selectorEscenarios.addEventListener('change', function() {
        cargarEscenario(this.value);
    });
    
    // Actualización inicial
    actualizarGrafico();
});

// ===================================================
// FUNCIONES AUXILIARES
// ===================================================

/**
 * Actualiza el valor mostrado en la etiqueta del slider
 */
function actualizarValorMostrado(tipo, valor) {
    let elementoId = '';
    
    switch(tipo) {
        case 'amplitud':
            elementoId = 'valor-amplitud';
            break;
        case 'frecuencia':
            elementoId = 'valor-frecuencia';
            break;
        case 'fs':
            elementoId = 'valor-fs';
            break;
    }
    
    if(elementoId) {
        const elemento = document.getElementById(elementoId);
        if(elemento) {
            elemento.textContent = valor.toFixed(1);
        }
    }
}

/**
 * Obtiene datos del servidor mediante POST a /api/calcular
 */
async function obtenerDatos() {
    try {
        const respuesta = await fetch('/api/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amplitud: valorActualAmplitud,
                frecuencia: valorActualFrecuencia,
                frecuencia_muestreo: valorActualFs
            })
        });
        
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        return datos;
        
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return null;
    }
}

/**
 * Actualiza la información del Teorema de Nyquist
 */
function actualizarInfoNyquist(datos) {
    const infoNyquist = document.getElementById('info-nyquist');
    
    if(!datos || !datos.nyquist) {
        infoNyquist.innerHTML = '<p class="cargando">Error al cargar datos</p>';
        console.error('Datos incompletos:', datos);
        return;
    }
    
    const info = datos.nyquist;
    const estado = info.estado;
    
    // Determinar clase CSS según el estado
    let claseCss = estado;
    let iconoEstado = '';
    
    switch(estado) {
        case 'correcto':
            iconoEstado = '✅';
            break;
        case 'limite':
            iconoEstado = '⚠️';
            break;
        case 'aliasing':
            iconoEstado = '❌';
            break;
    }
    
    // Construir HTML con información
    const html = `
        <p>${info.mensaje}</p>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;">
        <p><strong>f (señal):</strong> ${info.frecuencia_senyal.toFixed(2)} Hz</p>
        <p><strong>f<sub>s</sub> (muestreo):</strong> ${info.frecuencia_muestreo.toFixed(2)} Hz</p>
        <p><strong>f<sub>Nyquist</sub>:</strong> ${info.frecuencia_nyquist.toFixed(2)} Hz</p>
        <p style="margin-top: 10px; font-weight: bold; color: #667eea;">
            Condición: f<sub>s</sub> ≥ 2×f
        </p>
    `;
    
    infoNyquist.innerHTML = html;
    infoNyquist.className = 'info-nyquist ' + claseCss;
}

/**
 * Crea el gráfico principal (señal continua + muestras)
 */
function crearGraficoPrincipal(datos) {
    if(!datos || !datos.señal_continua || !datos.muestras) {
        console.error('Datos incompletos para el gráfico principal', datos);
        throw new Error('Datos incompletos para el gráfico principal');
    }
    
    // Validar que Plotly esté disponible
    if (typeof Plotly === 'undefined') {
        console.error('Plotly.js no está cargado');
        throw new Error('Plotly.js no está disponible');
    }
    
    const tContinua = datos.señal_continua.tiempo;
    const senhalContinua = datos.señal_continua.amplitudes;
    const tMuestras = datos.muestras.tiempo;
    const valorMuestras = datos.muestras.amplitudes;
    
    console.log('Datos para gráfico:', {
        tContinua: tContinua ? tContinua.length : 0,
        senhalContinua: senhalContinua ? senhalContinua.length : 0,
        tMuestras: tMuestras ? tMuestras.length : 0,
        valorMuestras: valorMuestras ? valorMuestras.length : 0
    });
    
    // Traza 1: Señal continua
    const trazaContinua = {
        x: tContinua,
        y: senhalContinua,
        mode: 'lines',
        name: 'Señal Continua (Analógica)',
        line: {
            color: COLORES.continua,
            width: 2.5
        },
        hovertemplate: '<b>Señal Continua</b><br>t: %{x:.3f}s<br>A: %{y:.3f}<extra></extra>'
    };
    
    // Traza 2: Muestras discretas
    const trazaMuestras = {
        x: tMuestras,
        y: valorMuestras,
        mode: 'markers',
        name: 'Muestras Discretas',
        marker: {
            color: COLORES.muestras,
            size: 8,
            symbol: 'circle',
            line: {
                color: 'rgba(0, 0, 0, 0.3)',
                width: 1
            }
        },
        hovertemplate: '<b>Muestra</b><br>t: %{x:.3f}s<br>A: %{y:.3f}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: '<b>Señal Continua vs Muestras Discretas</b>',
            font: { size: 16, color: '#333' }
        },
        xaxis: {
            title: '<b>Tiempo (segundos)</b>',
            showgrid: true,
            gridwidth: 1,
            gridcolor: '#e0e0e0'
        },
        yaxis: {
            title: '<b>Amplitud</b>',
            showgrid: true,
            gridwidth: 1,
            gridcolor: '#e0e0e0'
        },
        hovermode: 'closest',
        plot_bgcolor: '#fafafa',
        paper_bgcolor: 'white',
        margin: { l: 60, r: 40, t: 60, b: 60 },
        font: { family: 'Segoe UI, sans-serif', size: 11 },
        showlegend: true,
        legend: {
            x: 0.02,
            y: 0.98,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            bordercolor: '#ddd',
            borderwidth: 1
        }
    };
    
    const config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['lasso2d', 'select2d']
    };
    
    Plotly.newPlot('grafico-principal', 
        [trazaContinua, trazaMuestras], 
        layout, 
        config
    );
}

/**
 * Crea el gráfico de aliasing (cuando aplica)
 */
function crearGraficoAlias(datos) {
    if(!datos || !datos.alias) {
        // Ocultar contenedor de alias
        document.getElementById('contenedor-alias').style.display = 'none';
        return;
    }
    
    // Mostrar contenedor de alias
    document.getElementById('contenedor-alias').style.display = 'block';
    
    const tOriginal = datos.señal_continua.tiempo;
    const senhalOriginal = datos.señal_continua.amplitudes;
    const tAlias = datos.alias.tiempo;
    const senhalAlias = datos.alias.amplitudes;
    const fAlias = datos.alias.frecuencia_alias;
    
    // Traza 1: Señal original
    const trazaOriginal = {
        x: tOriginal,
        y: senhalOriginal,
        mode: 'lines',
        name: 'Señal Original',
        line: {
            color: COLORES.continua,
            width: 2.5,
            dash: 'dash'
        },
        hovertemplate: '<b>Original</b><br>t: %{x:.3f}s<br>A: %{y:.3f}<extra></extra>'
    };
    
    // Traza 2: Señal alias
    const trazaAlias = {
        x: tAlias,
        y: senhalAlias,
        mode: 'lines',
        name: `Señal Alias (f = ${fAlias.toFixed(2)}Hz)`,
        line: {
            color: COLORES.alias,
            width: 3
        },
        hovertemplate: '<b>Alias</b><br>t: %{x:.3f}s<br>A: %{y:.3f}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: `<b>⚠️ ALIASING DETECTADO - Señal Reconstruida Incorrectamente</b>`,
            font: { size: 16, color: COLORES.aliasing }
        },
        xaxis: {
            title: '<b>Tiempo (segundos)</b>',
            showgrid: true,
            gridwidth: 1,
            gridcolor: '#e0e0e0'
        },
        yaxis: {
            title: '<b>Amplitud</b>',
            showgrid: true,
            gridwidth: 1,
            gridcolor: '#e0e0e0'
        },
        hovermode: 'closest',
        plot_bgcolor: '#fafafa',
        paper_bgcolor: 'white',
        margin: { l: 60, r: 40, t: 80, b: 60 },
        font: { family: 'Segoe UI, sans-serif', size: 11 },
        showlegend: true,
        legend: {
            x: 0.02,
            y: 0.98,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            bordercolor: '#ddd',
            borderwidth: 1
        }
    };
    
    const config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['lasso2d', 'select2d']
    };
    
    Plotly.newPlot('grafico-alias', 
        [trazaOriginal, trazaAlias], 
        layout, 
        config
    );
}

/**
 * Función principal: Actualiza todo el dashboard
 */
async function actualizarGrafico() {
    console.log('🔄 Actualizando gráfico...');
    console.log(`   f = ${valorActualFrecuencia}Hz, fs = ${valorActualFs}Hz, A = ${valorActualAmplitud}`);
    
    // Obtener datos del servidor
    const datos = await obtenerDatos();
    
    if (!datos) {
        console.error('No se pudieron obtener los datos');
        document.getElementById('info-nyquist').innerHTML = '<p style="color: red;">❌ Error al conectar con el servidor</p>';
        return;
    }
    
    if (datos.error) {
        console.error('Error del servidor:', datos.error);
        document.getElementById('info-nyquist').innerHTML = `<p style="color: red;">❌ ${datos.error}</p>`;
        return;
    }
    
    // Actualizar información de Nyquist
    actualizarInfoNyquist(datos);
    
    // Crear/actualizar gráficos
    try {
        crearGraficoPrincipal(datos);
        crearGraficoAlias(datos);
        console.log('✅ Dashboard actualizado');
    } catch (error) {
        console.error('Error al crear gráficos:', error);
        document.getElementById('info-nyquist').innerHTML = `<p style="color: red;">❌ Error al renderizar gráficos: ${error.message}</p>`;
    }
}

// ===================================================
// MANEJO RESPONSIVO DE LA VENTANA
// ===================================================

window.addEventListener('resize', function() {
    // Redimensionar gráficos cuando la ventana cambia
    Plotly.Plots.resize('grafico-principal');
    const contenedorAlias = document.getElementById('contenedor-alias');
    if(contenedorAlias.style.display !== 'none') {
        Plotly.Plots.resize('grafico-alias');
    }
});
