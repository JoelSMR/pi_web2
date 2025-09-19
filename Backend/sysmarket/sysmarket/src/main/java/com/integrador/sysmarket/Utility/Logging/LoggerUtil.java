package com.integrador.sysmarket.Utility.Logging;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Utility class for handling simple application logging with daily log files.
 * <p>
 * Each log type (init, error, payment) will be stored in its own folder
 * under the main {@code logs} directory. Log files are created per day.
 * </p>
 */
public class LoggerUtil {
    /** Root logs folder */
    private static final Path LOG_FOLDER = Paths.get("logs");

    /** Format for log messages timestamp */
    private static final DateTimeFormatter MSG_TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /** Format for log file names (one per day) */
    private static final DateTimeFormatter FILE_DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // Static initializer: ensures that the root logs folder exists.
    static {
        try {
            if (!Files.exists(LOG_FOLDER)) {
                Files.createDirectories(LOG_FOLDER);
            }
        } catch (IOException e) {
            System.err.println("Could not create logs folder: " + e.getMessage());
        }
    }
    
    /**
     * Writes a message to the specified log file inside a subfolder.
     *
     * @param subFolder the name of the subfolder (e.g., "error")
     * @param msg       the message to be logged
     */
    private static void write(String subFolder, String msg) {
        String line = LocalDateTime.now().format(MSG_TIME_FORMAT) + " - " + msg + System.lineSeparator();
        try {
            Path folder = LOG_FOLDER.resolve(subFolder);
            if (!Files.exists(folder)) {
                Files.createDirectories(folder);
            }

            // Daily file name: yyyy-MM-dd.log
            String fileName = LocalDateTime.now().format(FILE_DATE_FORMAT) + ".log";
            Path filePath = folder.resolve(fileName);

            Files.writeString(filePath, line, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            System.err.println("Error writing log in " + subFolder + " : " + e.getMessage());
        }
    }

    /** Logs initialization-related messages into {@code logs/init/yyyy-MM-dd.log}. */
    public static void logInit(String msg) {
        write("init", msg);
    }

    /** Logs error messages into {@code logs/error/yyyy-MM-dd.log}. */
    public static void logError(String msg) {
        write("error", msg);
    }

    /** Logs payment-related messages into {@code logs/payment/yyyy-MM-dd.log}. */
    public static void logPayment(String msg) {
        write("payment", msg);
    }
}
