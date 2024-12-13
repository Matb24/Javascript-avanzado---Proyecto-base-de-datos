import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const almacenSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    peso: {
        type: Number,
        required: true,
        min: 0
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    fechaIngreso: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: ['disponible', 'dañado', 'en espera','agotado'],
        default: 'disponible'
    },
    proveedor: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

// Aplicar el plugin de auto-incremento al campo deseado
almacenSchema.plugin(AutoIncrement, { inc_field: 'idProducto' });

export default mongoose.model('Almacen', almacenSchema);
