package com.im.moobeing.domain.expense.service;

import com.im.moobeing.domain.expense.dto.response.ExpenseHistoryResponse;
import java.util.List;

public interface DealService {

    List<ExpenseHistoryResponse> getExpenseHistory();

}
