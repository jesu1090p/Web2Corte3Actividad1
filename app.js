import express from 'express';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: 'containers-us-west-140.railway.app',
    user: 'root',
    password: 'w0WUsXAYnxl4NjpkseDc',
    database: 'railway',
    port: '5737'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

const secretKey = 'tu_clave_secreta';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validar credenciales en la base de datos
    db.query(
        'SELECT id, username FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error en la base de datos' });
            }

            if (results.length === 1) {
                // Usuario válido, generar token JWT y continuar con la autenticación
                const token = jwt.sign({ userId: results[0].id }, secretKey, { expiresIn: 300 });
                res.cookie('token', token, { httpOnly: true });
                res.json({ message: 'Inicio de sesión exitoso' });
            } else {
                // No se encontró un usuario con las credenciales proporcionadas
                res.status(401).json({ message: 'Usuario no creado' });
            }
        }
    );
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).json({ message: 'Error al registrar el usuario'});
        }
        console.log('Registro exitoso:', result);
        res.json({ message: 'Usuario registrado con éxito' });
    });
});

app.get('/welcome.html', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
        res.redirect('/welcome.html');
    });
});

app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
