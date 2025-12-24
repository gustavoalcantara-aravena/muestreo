"""
Dashboard Educativo: Procesamiento Digital de Señales
Teorema de Nyquist-Shannon - Muestreo de Señales

Ingeniero: Procesamiento Digital de Señales + Backend Flask
Objetivo: Visualizar interactivamente frecuencia, amplitud, muestreo y aliasing
"""

from flask import Flask, render_template, jsonify, request
import numpy as np
import json

app = Flask(__name__)

# ============================================================
# FUNCIONES DE PROCESAMIENTO DE SEÑALES
# ============================================================

def generar_senyal_continua(amplitud, frecuencia, duracion=2.0, muestras=1000):
    """
    Genera una señal senoidal continua (analógica).
    
    Parámetros:
    - amplitud: Amplitud de la onda (0.5 a 5)
    - frecuencia: Frecuencia en Hz (0.5 a 5)
    - duracion: Duración total en segundos (default: 2)
    - muestras: Puntos para graficar (densidad)
    
    Retorna:
    - tiempo: Array de tiempo
    - senyal: Array de amplitudes de la señal
    """
    t = np.linspace(0, duracion, muestras)
    senyal = amplitud * np.sin(2 * np.pi * frecuencia * t)
    return t, senyal


def muestrear_senyal(amplitud, frecuencia, fs, duracion=2.0):
    """
    Realiza muestreo de la señal a frecuencia de muestreo fs.
    
    Parámetros:
    - amplitud: Amplitud de la onda
    - frecuencia: Frecuencia de la señal (Hz)
    - fs: Frecuencia de muestreo (Hz)
    - duracion: Duración total (segundos)
    
    Retorna:
    - tiempo_muestreado: Tiempos de las muestras
    - muestras: Valores de la señal en los tiempos de muestreo
    """
    # Número de muestras: fs * duracion
    num_muestras = int(fs * duracion)
    t_muestreado = np.linspace(0, duracion, num_muestras)
    muestras = amplitud * np.sin(2 * np.pi * frecuencia * t_muestreado)
    return t_muestreado, muestras


def reconstruir_senyal_alias(amplitud, frecuencia, fs, duracion=2.0, muestras=1000):
    """
    Reconstruye la señal alias cuando fs < 2*f (Nyquist violado).
    
    La frecuencia alias es: f_alias = |f - fs| o |f - 2*fs| ...
    
    Parámetros:
    - amplitud, frecuencia, fs: parámetros de muestreo
    - muestras: densidad de reconstrucción
    
    Retorna:
    - tiempo: Array de tiempo continuo
    - senyal_alias: Señal reconstruida (alias)
    """
    t = np.linspace(0, duracion, muestras)
    
    # Calcular frecuencia alias
    # Formula: f_alias = |f mod fs - fs|
    f_alias = np.abs((frecuencia % fs) - fs)
    if f_alias == 0:
        f_alias = frecuencia % fs
    
    senyal_alias = amplitud * np.sin(2 * np.pi * f_alias * t)
    return t, senyal_alias, f_alias


def analizar_nyquist(frecuencia, fs):
    """
    Analiza el cumplimiento del Teorema de Nyquist.
    
    Nyquist: fs >= 2*f (frecuencia de muestreo debe ser al menos
    el doble de la frecuencia máxima de la señal)
    
    Retorna:
    - es_valido: Boolean
    - mensaje: String explicativo
    - estado: 'correcto', 'limite', 'aliasing'
    """
    frecuencia_nyquist = 2 * frecuencia
    
    if fs > frecuencia_nyquist:
        return True, f"✅ Muestreo CORRECTO: fs ({fs:.1f}Hz) > 2×f ({frecuencia_nyquist:.1f}Hz)", "correcto"
    elif fs == frecuencia_nyquist:
        return True, f"⚠️ LÍMITE de Nyquist: fs = 2×f ({frecuencia_nyquist:.1f}Hz)", "limite"
    else:
        return False, f"❌ ALIASING: fs ({fs:.1f}Hz) < 2×f ({frecuencia_nyquist:.1f}Hz)", "aliasing"


# ============================================================
# RUTAS FLASK
# ============================================================

@app.route('/')
def index():
    """Renderiza la página principal."""
    return render_template('index.html')


@app.route('/api/calcular', methods=['POST'])
def calcular():
    """
    Endpoint API para calcular y retornar datos de gráficos.
    
    Recibe JSON con:
    - amplitud: float (0.5 a 5)
    - frecuencia: float (0.5 a 5 Hz)
    - frecuencia_muestreo: float (0.5 a 20 Hz)
    
    Retorna: JSON con datos para graficar
    """
    try:
        # Obtener datos JSON del request
        data = request.get_json(force=True, silent=True)
        
        # Validar que data no sea None
        if data is None:
            data = {}
        
        amplitud = float(data.get('amplitud', 1.0))
        frecuencia = float(data.get('frecuencia', 1.0))
        fs = float(data.get('frecuencia_muestreo', 10.0))
        
        # Validar rangos
        amplitud = max(0.1, min(5.0, amplitud))
        frecuencia = max(0.1, min(5.0, frecuencia))
        fs = max(0.5, min(20.0, fs))
        
        duracion = 3.0  # 3 segundos para visualizar mejor
        
        # Generar señal continua (analógica)
        t_continua, senyal_continua = generar_senyal_continua(
            amplitud, frecuencia, duracion, muestras=2000
        )
        
        # Muestrear la señal
        t_muestreo, muestras = muestrear_senyal(
            amplitud, frecuencia, fs, duracion
        )
        
        # Analizar Nyquist
        es_valido, mensaje_nyquist, estado = analizar_nyquist(frecuencia, fs)
        
        # Generar señal alias si aplica
        senyal_alias = None
        f_alias = None
        if not es_valido:
            t_alias, senyal_alias, f_alias = reconstruir_senyal_alias(
                amplitud, frecuencia, fs, duracion, muestras=2000
            )
        
        # Preparar respuesta JSON
        respuesta = {
            'señal_continua': {
                'tiempo': t_continua.tolist(),
                'amplitudes': senyal_continua.tolist(),
                'etiqueta': 'Señal Original (Continua)'
            },
            'muestras': {
                'tiempo': t_muestreo.tolist(),
                'amplitudes': muestras.tolist(),
                'etiqueta': 'Muestras Discretas'
            },
            'nyquist': {
                'valido': es_valido,
                'mensaje': mensaje_nyquist,
                'estado': estado,
                'frecuencia_nyquist': 2 * frecuencia,
                'frecuencia_muestreo': fs,
                'frecuencia_senyal': frecuencia
            }
        }
        
        # Agregar alias si existe
        if senyal_alias is not None:
            respuesta['alias'] = {
                'tiempo': t_alias.tolist(),
                'amplitudes': senyal_alias.tolist(),
                'frecuencia_alias': f_alias,
                'etiqueta': f'Señal Alias (f_alias ≈ {f_alias:.2f}Hz)'
            }
        
        return jsonify(respuesta)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# ============================================================
# MAIN
# ============================================================

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 DASHBOARD: Procesamiento Digital de Señales")
    print("   Teorema de Nyquist-Shannon")
    print("="*60)
    print("\n📊 Servidor ejecutándose en: http://localhost:5000")
    print("⏹️  Presiona Ctrl+C para detener\n")
    
    # Ejecutar en localhost, puerto 5000
    # debug=False en producción, True para desarrollo
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=False,
        use_reloader=False
    )
