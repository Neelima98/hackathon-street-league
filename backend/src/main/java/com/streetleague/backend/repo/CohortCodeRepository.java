package com.streetleague.backend.repo;

import com.streetleague.backend.model.CohortCodeDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CohortCodeRepository {

    public List<CohortCodeDTO> getCohortCodes() {
        return List.of(
                new CohortCodeDTO("COH-0000"),
                new CohortCodeDTO("COH-1000100010001000"),
                new CohortCodeDTO("COH-100100100100"),
                new CohortCodeDTO("COH-1001100110011001"),
                new CohortCodeDTO("COH-1002100210021002"),
                new CohortCodeDTO("COH-1003100310031003"),
                new CohortCodeDTO("COH-1004100410041004"),
                new CohortCodeDTO("COH-1005100510051005"),
                new CohortCodeDTO("COH-1006100610061006"),
                new CohortCodeDTO("COH-1007100710071007"),
                new CohortCodeDTO("COH-1008100810081008"),
                new CohortCodeDTO("COH-1009100910091009"),
                new CohortCodeDTO("COH-10101010"),
                new CohortCodeDTO("COH-1010101010101010"),
                new CohortCodeDTO("COH-101101101101"),
                new CohortCodeDTO("COH-1011101111011101"),
                new CohortCodeDTO("COH-1012101210121012"),
                new CohortCodeDTO("COH-1013101310131013"),
                new CohortCodeDTO("COH-1014101410141014"),
                new CohortCodeDTO("COH-1015101510151015")
        );
    }
}
