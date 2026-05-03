// init/init-script.js
db = db.getSiblingDB('auth');

db.createCollection('roles');

db.roles.insertMany([
    { name: 'admin' },
    { name: 'user' },
    { name: 'client' }
]);

print('Colección de Roles inicializada con éxito');