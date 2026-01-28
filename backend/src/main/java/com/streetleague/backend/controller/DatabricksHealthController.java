package com.streetleague.backend.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Profile("databricks")
public class DatabricksHealthController {

    private final JdbcTemplate jdbc;

    public DatabricksHealthController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/dbx-test")
    public Map<String, Object> test() {
        return jdbc.queryForMap("SELECT 1 AS ok");
    }
}
