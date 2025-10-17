import bcrypt from 'bcryptjs';

const password = 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUse this hash in your database!');
});

// Also test the existing hash
const existingHash = '$2a$10$8K5UqQ8qF0DxGbQQQnZv5.VX0q0j5p4vJZzQBXqxQKHQ5Qz5QZQ5e';
bcrypt.compare(password, existingHash, (err, result) => {
  if (err) {
    console.error('Error comparing:', err);
    return;
  }
  console.log('\nDoes "admin123" match existing hash?', result);
});
