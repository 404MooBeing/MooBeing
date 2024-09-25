package com.im.moobeing.domain.deal.service;

import com.im.moobeing.domain.deal.dto.response.ExpenseHistoryResponse;
import java.util.List;

public interface DealService {

    List<ExpenseHistoryResponse> getExpenseHistory();

}
