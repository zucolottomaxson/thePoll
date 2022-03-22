package com.max.poll.service.mapper;

import com.max.poll.domain.Poll;
import com.max.poll.service.dto.PollDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity {@link Poll} and its DTO called {@link PollDTO}.
 */
@Mapper(componentModel = "spring")
public interface PollMapper {
    @Mapping(target = "userId", source = "user.id")
    PollDTO toDto(Poll poll);

    @Mapping(target = "user.id", source = "userId")
    Poll toEntity(PollDTO pollDTO);

    List<PollDTO> toDto(List<Poll> polls);
}
