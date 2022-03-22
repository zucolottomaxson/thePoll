package com.max.poll.service.mapper;

import com.max.poll.domain.Answer;
import com.max.poll.service.dto.AnswerDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Answer} and its DTO called {@link AnswerDTO}.
 */
@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "pollId", source = "poll.id")
    AnswerDTO toDto(Answer poll);

    @Mapping(target = "user.id", source = "userId")
    @Mapping(target = "poll.id", source = "pollId")
    Answer toEntity(AnswerDTO answerDTO);
}
