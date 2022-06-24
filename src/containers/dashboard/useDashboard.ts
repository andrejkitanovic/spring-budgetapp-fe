import { useState } from "react";

import { queryCache, useMutation, useQuery } from "react-query";
import { FormikConfig } from "formik";
import { deleteSingleIncome, getIncomes, postIncome, putSingleIncome } from "api/income";
import { deleteSingleOutcome, getOutcomes, postOutcome, putSingleOutcome } from "api/outcome";
import { IncomePayload } from "api/income/types";
import { OutcomePayload } from "api/outcome/types";

export const useDashboard = () => {
  const [editBudget, setEditBudget] = useState<{
    type: "income" | "outcome";
    id: number;
  } | null>(null);
  const { data: incomes } = useQuery("incomes-all", async () => {
    const res = await getIncomes();

    return res.data;
  });
  const { data: outcomes } = useQuery("outcomes-all", async () => {
    const res = await getOutcomes();

    return res.data;
  });

  const incomesTotal = incomes?.reduce((prev, curr) => prev + curr.value, 0);
  const outcomesTotal = outcomes?.reduce((prev, curr) => prev + curr.value, 0);
  const total = (incomesTotal || 0) - (outcomesTotal || 0);

  const [addIncome] = useMutation(async (income: IncomePayload) => {
    const res = await postIncome(income);
    await queryCache.invalidateQueries("incomes-all");
    return res.data;
  });

  const [addOutcome] = useMutation(async (outcome: OutcomePayload) => {
    const res = await postOutcome(outcome);
    await queryCache.invalidateQueries("outcomes-all");
    return res.data;
  });

  const handleAdd: FormikConfig<any>["onSubmit"] = async (
    values,
    { resetForm }
  ) => {
    if (values.type === "income") {
      await addIncome({
        description: values.description,
        value: values.value,
        date: new Date(),
      });
    } else {
      await addOutcome({
        description: values.description,
        value: values.value,
        date: new Date(),
      });
    }

    resetForm();
  };

  const [deleteIncome] = useMutation(async (incomeId: string) => {
    const res = await deleteSingleIncome(incomeId);
    await queryCache.invalidateQueries("incomes-all");
    return res.data;
  });

  const handleDeleteIncome = async (incomeId: number) => {
    await deleteIncome(JSON.stringify(incomeId));
  };

  const [deleteOutcome] = useMutation(async (outcomeId: string) => {
    const res = await deleteSingleOutcome(outcomeId);
    await queryCache.invalidateQueries("outcomes-all");
    return res.data;
  });

  const handleDeleteOutcome = async (outcomeId: number) => {
    await deleteOutcome(JSON.stringify(outcomeId));
  };

  const [editSingleIncome] = useMutation(
    async ({ income, incomeId }: { income: IncomePayload; incomeId: string }) => {
      const res = await putSingleIncome(income, incomeId);
      await queryCache.invalidateQueries("incomes-all");
      return res.data;
    }
  );

  const handleEditIncome = async (income: IncomePayload, incomeId: number) => {
    await editSingleIncome({ income, incomeId: JSON.stringify(incomeId) });
  };

  const [editSingleOutcome] = useMutation(
    async ({ outcome, outcomeId }: { outcome: OutcomePayload; outcomeId: string }) => {
      const res = await putSingleOutcome(outcome, outcomeId);
      await queryCache.invalidateQueries("outcomes-all");
      return res.data;
    }
  );

  const handleEditOutcome = async (outcome: OutcomePayload, outcomeId: number) => {
    await editSingleOutcome({ outcome, outcomeId: JSON.stringify(outcomeId) });
  };

  const handleEdit = (type: "income" | "outcome", id: number) => {
    setEditBudget({ type, id });
  };
  const cancelEdit = () => {
    setEditBudget(null);
  };

  return {
    editBudget,
    incomes,
    outcomes,
    incomesTotal,
    outcomesTotal,
    total,
    handleAdd,
    handleDeleteIncome,
    handleDeleteOutcome,
    handleEditIncome,
    handleEditOutcome,
    handleEdit,
    cancelEdit,
  };
};
