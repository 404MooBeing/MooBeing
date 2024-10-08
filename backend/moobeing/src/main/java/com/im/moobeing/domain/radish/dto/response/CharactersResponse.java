package com.im.moobeing.domain.radish.dto.response;

import com.im.moobeing.domain.radish.entity.Radish;

public record CharactersResponse(
        Long radishId,
        String radishName,
        String radishImageUrl,
        Long count,
        String radishRank

) {
    public static CharactersResponse of(Radish radish, Long count) {
        return new CharactersResponse(radish.getId(), radish.getRadishName(), radish.getRadishImageUrl(), count, radish.getRadishRank());
    }
}
