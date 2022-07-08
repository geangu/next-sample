import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState();
  const [redirect, setRedirect] = useState(false);
  const [editing, setEditing] = useState(false);

  const [newName, setNewName] = useState();

  const handleEdit = (name) => {
    setNewName(name);
    setEditing(true);
  };

  const handleConfirm = () => {
    fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setEditing(false);
      });
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Quiere eliminar este producto?')) {
      fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.text())
        .then(() => router.push('/products'));
    }
  };

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((e) => setRedirect(true));
  }, [id]);

  if (redirect) {
    router.push('/products');
  }

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Detalle de producto</h1>
      <hr />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.id}</td>
            <td>
              {editing && (
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              )}
              {!editing && product.name}
            </td>
            <td>
              {!editing && (
                <>
                  <button onClick={() => handleEdit(product.name)}>
                    Editar
                  </button>
                  <button onClick={handleDelete}>Eliminar</button>
                </>
              )}
              {editing && (
                <>
                  <button onClick={handleConfirm}>Confirmar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <Link href="/products">Volver</Link>
    </div>
  );
};

export default ProductDetail;
