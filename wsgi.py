import sys
import os

# Añadir el directorio de tu aplicación Flask a la ruta de búsqueda de módulos
sys.path.insert(0, '/home/giakantas/mysite')

# Configurar la variable de entorno para Flask
os.environ['FLASK_APP'] = 'app.py'

# Importar la aplicación Flask
from app import app as application