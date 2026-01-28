package com.streetleague.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@Profile("databricks")
public class DatabricksConfig {

    @Bean
    public DataSource databricksDataSource(
            @Value("${databricks.host}") String host,
            @Value("${databricks.httpPath}") String httpPath,
            @Value("${databricks.token}") String token
    ) {
        String url =
                "jdbc:databricks://" + host + ":443/default;" +
                "transportMode=http;" +
                "ssl=1;" +
                "httpPath=" + httpPath + ";" +
                "AuthMech=3;" +
                "UID=token;" +
                "PWD=" + token;

        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("com.databricks.client.jdbc.Driver");
        ds.setUrl(url);
        return ds;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource databricksDataSource) {
        return new JdbcTemplate(databricksDataSource);
    }
}
