import { supabase } from '../supabase';

export async function registrarCompra(producto, usuarioId) {
  const { error, data } = await supabase
    .from('compras')
    .insert([
      {
        usuarioid: usuarioId,
        productoid: producto.id,
        nombre: producto.title,
        imagen: producto.images?.[0] || '',
        precio: producto.price,
        // fecha_compra se genera automáticamente con now()
      }
    ]);

  if (error) {
    console.error("Error registrando compra:", error);
    throw error; // Esto hace que el catch en Producto.jsx lo atrape y muestre bien
  }

  return data;
}

export async function obtenerComprasUsuario(usuarioid) {
  const { data, error } = await supabase
    .from('compras')
    .select('*')
    .eq('usuarioid', usuarioid)
    .order('fecha_compra', { ascending: false });

  if (error) {
    console.error("Error obteniendo compras:", error);
    return [];
  }

  return data;
}
