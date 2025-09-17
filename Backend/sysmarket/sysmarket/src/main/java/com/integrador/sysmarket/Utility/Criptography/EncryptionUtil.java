package com.integrador.sysmarket.Utility.Criptography;

import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;


public class EncryptionUtil{
    private static final int IV_SIZE=12;
    private static final int TAG_SIZE=512;
    private static final int KEY_SIZE=256;
    private static final int ITERATIONS=65536;
    private static final int SALT_SIZE=12;

    private static SecretKey generateKey(char[] password, byte[] salt) throws Exception {
        PBEKeySpec spec = new PBEKeySpec(password, salt, ITERATIONS, KEY_SIZE);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        byte[] keyBytes = factory.generateSecret(spec).getEncoded();
        return new SecretKeySpec(keyBytes, "AES");
    }
    /**
     * 
     * @param encryptionKey
     * @param dataToEncrypt
     * @return cyphred String
     * @throws Exception
     */
    public static String encrypt (String encryptionKey, String  dataToEncrypt)throws Exception {
        byte[] salt = new byte[SALT_SIZE];

        SecureRandom random = new SecureRandom();
        random.nextBytes(salt);

        SecretKey key= generateKey(dataToEncrypt.toCharArray(), salt);

        byte[] iv = new byte[IV_SIZE];
        random.nextBytes(iv);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(TAG_SIZE, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);

        byte[] encrypted = cipher.doFinal(dataToEncrypt.getBytes());

        // Concatenar salt + iv + ciphertext y codificar en Base64
        byte[] encryptedMessage = new byte[salt.length + iv.length + encrypted.length];
        System.arraycopy(salt, 0, encryptedMessage, 0, salt.length);
        System.arraycopy(iv, 0, encryptedMessage, salt.length, iv.length);
        System.arraycopy(encrypted, 0, encryptedMessage, salt.length + iv.length, encrypted.length);

        return Base64.getEncoder().encodeToString(encryptedMessage).toString();

        
    }

    /**
     * 
     * @param encryptionKey
     * @param encryptedData
     * @return Decyphred String
     * @throws Exception
     */
    public static String decrypt(String encryptionKey,String encryptedData) throws Exception{
        byte[] decoded = Base64.getDecoder().decode(encryptedData);

        byte[] salt = new byte[SALT_SIZE];
        byte[] iv = new byte[IV_SIZE];
        byte[] ciphertext = new byte[decoded.length - SALT_SIZE - IV_SIZE];

        System.arraycopy(decoded, 0, salt, 0, SALT_SIZE);
        System.arraycopy(decoded, SALT_SIZE, iv, 0, IV_SIZE);
        System.arraycopy(decoded, SALT_SIZE + IV_SIZE, ciphertext, 0, ciphertext.length);

        SecretKey key = generateKey(encryptionKey.toCharArray(), salt);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(TAG_SIZE, iv);
        cipher.init(Cipher.DECRYPT_MODE, key, spec);

        byte[] decrypted = cipher.doFinal(ciphertext);

        return new String(decrypted);
    }

}