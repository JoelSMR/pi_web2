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
}
