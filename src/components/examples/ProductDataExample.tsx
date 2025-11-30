import { useProducts } from '../../hooks/useProducts';

/**
 * Example component showing how to fetch and access product data
 *
 * This demonstrates:
 * 1. Fetching products from the API
 * 2. Accessing all product properties
 * 3. Handling loading and error states
 */
export default function ProductDataExample() {
  const { products, loading, error, refetch } = useProducts();

  if (loading) {
    return <div className="p-4">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
        <button
          onClick={refetch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products ({products.length})</h1>

      {/* Example: Display all products */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            {/* ACCESSING BASIC PRODUCT INFO */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.shortDescription}</p>

            {/* ACCESSING PRICE INFO */}
            <p className="text-lg font-bold mt-2">
              ₱{product.basePrice}
              {product.salePrice && (
                <span className="text-sm line-through ml-2">
                  ₱{product.salePrice}
                </span>
              )}
            </p>

            {/* ACCESSING COLOR AND TYPE */}
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-gray-200 text-xs">
                {product.color}
              </span>
              <span className="px-2 py-1 bg-blue-200 text-xs">
                {product.type}
              </span>
            </div>

            {/* ACCESSING CATEGORY */}
            <p className="text-sm text-gray-500">
              Category: {product.category.name}
            </p>

            {/* ACCESSING VARIANTS */}
            {product.productVariants.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold">Variants:</p>
                {product.productVariants.map((variant) => (
                  <div key={variant.id} className="text-xs ml-2">
                    - {variant.name}
                    <span className="text-gray-500">
                      (+₱{variant.priceAdjustment})
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* FEATURED BADGE */}
            {product.isFeatured && (
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-400 text-xs rounded">
                ⭐ Featured
              </span>
            )}
          </div>
        ))}
      </div>

      {/* EXAMPLES OF FILTERING/ACCESSING DATA */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">Data Access Examples:</h2>

        {/* Example: Get featured products */}
        <div className="mb-4">
          <h3 className="font-semibold">Featured Products:</h3>
          <p>{products.filter((p) => p.isFeatured).length} featured items</p>
        </div>

        {/* Example: Get products by type */}
        <div className="mb-4">
          <h3 className="font-semibold">Premium Products:</h3>
          <p>
            {products.filter((p) => p.type === 'premium').length} premium items
          </p>
        </div>

        {/* Example: Get first product's details */}
        {products[0] && (
          <div className="mb-4">
            <h3 className="font-semibold">First Product Details:</h3>
            <pre className="text-xs bg-white p-2 rounded overflow-auto">
              {`// Access any property:
products[0].id → "${products[0].id}"
products[0].name → "${products[0].name}"
products[0].basePrice → ${products[0].basePrice}
products[0].imageUrl → "${products[0].imageUrl}"
products[0].category.name → "${products[0].category.name}"
products[0].productVariants[0]?.name → "${products[0].productVariants[0]?.name}"
`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * QUICK REFERENCE - How to access data:
 *
 * 1. Basic product info:
 *    - product.id
 *    - product.name
 *    - product.description
 *    - product.shortDescription
 *    - product.imageUrl
 *
 * 2. Price info:
 *    - product.basePrice
 *    - product.salePrice
 *    - product.costPrice
 *
 * 3. Product attributes:
 *    - product.color
 *    - product.type ('classic' or 'premium')
 *    - product.sku
 *
 * 4. Inventory flags:
 *    - product.trackInventory
 *    - product.allowBackorder
 *
 * 5. Status:
 *    - product.isActive
 *    - product.isFeatured
 *
 * 6. Category:
 *    - product.category.id
 *    - product.category.name
 *    - product.category.slug
 *    - product.category.description
 *
 * 7. Variants:
 *    - product.productVariants (array)
 *    - product.productVariants[0].name
 *    - product.productVariants[0].priceAdjustment
 *    - product.productVariants[0].imageUrl
 *
 * 8. Metadata:
 *    - product.createdAt
 *    - product.purchaseCount
 *    - product.tags
 */
