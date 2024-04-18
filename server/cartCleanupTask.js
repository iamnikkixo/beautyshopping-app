const cron = require('node-cron');
const Cart = require('./models/cart');
const Product = require('./models/product');

const startCartCleanupTask = () => {
  // Run the task every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('[Cart Cleanup Task] Running cleanup task at', new Date());

    const carts = await Cart.find().populate('items.product');
    for (const cart of carts) {
      let updated = false;

      for (let i = cart.items.length - 1; i >= 0; i--) {
        const item = cart.items[i];
        const timeDiff = new Date() - new Date(item.addedAt);

        // one hour
        if (timeDiff > 60 * 60 * 1000) {
          console.log(
            `[Cart Cleanup Task] Removing item from cart. Product ID: ${item.product._id}, Quantity: ${item.quantity}, Time Added: ${item.addedAt}`
          );

          // Update product stock
          const product = await Product.findById(item.product._id);
          if (product) {
            product.stock += item.quantity;
            await product.save();
            console.log(
              `[Cart Cleanup Task] Reverted stock for Product ID: ${item.product._id}. New Stock: ${product.stock}`
            );
          }

          // Remove the item from the cart
          cart.items.splice(i, 1);
          updated = true;
        }
      }

      if (updated) {
        if (cart.items.length === 0) {
          await Cart.deleteOne({ _id: cart._id });
          console.log(`[Cart Cleanup Task] Empty cart ${cart._id} deleted`);
        } else {
          await cart.calculateTotalCost();
          await cart.save();
          console.log(
            '[Cart Cleanup Task] Cart updated and stock reverted for cart ID:',
            cart._id
          );
        }
      }
    }

    console.log('[Cart Cleanup Task] Cleanup task completed at', new Date());
  });
};

module.exports = { startCartCleanupTask };
