package com.ReefGaurdian.rp.DTO;

import com.ReefGaurdian.rp.model.RegistrationSource;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResDTO {

    private String id;

    private String name;

    private String email;

    private String profileImage;

    private RegistrationSource source;

    private List<String> followedUsers;
}
