package com.streetleague.backend.repo;

import com.streetleague.backend.model.DropdownOptionDTO;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@Profile("databricks")
public class DatabricksDropdownRepository {

    private final NamedParameterJdbcTemplate namedJdbc;

    public DatabricksDropdownRepository(NamedParameterJdbcTemplate namedJdbc) {
        this.namedJdbc = namedJdbc;
    }

    private static final String SQL = """
        SELECT 'theme_name' AS field, CAST(wt.theme_name AS STRING) AS value
        FROM hackathon.emea.workshop_theme wt
        WHERE wt.is_active = TRUE AND wt.theme_name IS NOT NULL

        UNION ALL

        SELECT 'product_type_name' AS field, CAST(pt.product_type_name AS STRING) AS value
        FROM hackathon.emea.product_type pt
        WHERE pt.is_active = TRUE AND pt.product_type_name IS NOT NULL

        UNION ALL

        SELECT 'delivery_method' AS field, CAST(lp.delivery_method AS STRING) AS value
        FROM hackathon.emea.lesson_plan lp
        WHERE lp.is_active = TRUE AND lp.delivery_method IS NOT NULL

        UNION ALL

        SELECT 'difficulty_level' AS field, CAST(lp.difficulty_level AS STRING) AS value
        FROM hackathon.emea.lesson_plan lp
        WHERE lp.is_active = TRUE AND lp.difficulty_level IS NOT NULL

        UNION ALL

        SELECT 'max_participants' AS field, CAST(lp.max_participants AS STRING) AS value
        FROM hackathon.emea.lesson_plan lp
        WHERE lp.is_active = TRUE AND lp.max_participants IS NOT NULL
        """;

    /** Returns grouped dropdowns like { "theme_name": ["A","B"], "delivery_method": ["Online", ...] } */
    public Map<String, List<String>> getDropdowns() {
        List<DropdownOptionDTO> rows = namedJdbc.query(SQL, Map.of(), (rs, rowNum) ->
                new DropdownOptionDTO(
                        rs.getString("field"),
                        rs.getString("value")
                )
        );

        // Group + unique + sort
        Map<String, Set<String>> temp = new LinkedHashMap<>();
        for (DropdownOptionDTO r : rows) {
            temp.computeIfAbsent(r.getField(), k -> new TreeSet<>()).add(r.getValue());
        }

        Map<String, List<String>> out = new LinkedHashMap<>();
        for (var e : temp.entrySet()) {
            out.put(e.getKey(), new ArrayList<>(e.getValue()));
        }
        return out;
    }
}
