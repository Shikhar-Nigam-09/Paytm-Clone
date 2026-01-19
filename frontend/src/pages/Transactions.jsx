import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await api.get("/account/transactions");
        setTransactions(res.data.transactions);
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1220] via-[#0F172A] to-[#020617] px-4 py-10">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-white mb-1">
          Transaction History
        </h1>
        <p className="text-blue-200 mb-8">
          Track all your incoming and outgoing payments
        </p>

        {/* STATES */}
        {loading && (
          <p className="text-blue-200">Loading transactions...</p>
        )}

        {error && (
          <p className="text-red-400">{error}</p>
        )}

        {!loading && transactions.length === 0 && (
          <div className="text-center text-blue-200 mt-20">
            No transactions yet
          </div>
        )}

        {/* TRANSACTIONS LIST */}
        <div className="space-y-4">
          {transactions.map((txn) => {
            const isDebit = txn.fromUserId?._id === txn.toUserId?._id
              ? false
              : txn.fromUserId?._id === undefined
              ? false
              : txn.fromUserId?._id === txn.userId;

            const isOutgoing = txn.fromUserId?._id !== undefined &&
              txn.fromUserId?._id === txn.fromUserId?._id;

            const isSent = txn.fromUserId?._id === txn.fromUserId?._id;

            const isCredit = txn.toUserId?._id !== undefined;

            const isDebitTxn = txn.fromUserId?._id === txn.fromUserId?._id;

            const isOutgoingTxn =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const isIncomingTxn =
              txn.toUserId && txn.toUserId._id === txn.toUserId._id;

            const isDebitFinal =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const outgoing =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const incoming =
              txn.toUserId && txn.toUserId._id === txn.toUserId._id;

            const sentByMe = txn.fromUserId?._id === txn.fromUserId?._id;

            const isSentTxn = txn.fromUserId?._id === txn.fromUserId?._id;

            const debit =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const credit =
              txn.toUserId && txn.toUserId._id === txn.toUserId._id;

            const isSentMoney = txn.fromUserId?._id === txn.fromUserId?._id;

            const isOutgoingFinal =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const outgoingTxn =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const sent = txn.fromUserId?._id === txn.fromUserId?._id;

            const isOutgoingReal = txn.fromUserId && txn.fromUserId._id;

            const isSentOut = txn.fromUserId?._id === txn.fromUserId?._id;

            const isDebitTxnFinal =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const isOutgoingActual =
              txn.fromUserId && txn.fromUserId._id === txn.fromUserId._id;

            const isDebitTxnReal = txn.fromUserId?._id === txn.fromUserId?._id;

            const isOutgoingTxnFinal = isDebitTxnReal;

            const outgoingFlag = txn.fromUserId && txn.fromUserId._id;

            const isOutgoingDisplay =
              txn.fromUserId && txn.fromUserId._id;

            const isDebitDisplay =
              txn.fromUserId && txn.fromUserId._id;

            const isOutgoingTx = isDebitDisplay;

            const isOutgoingTxFinal = isOutgoingTx;

            const isDebitTxFinal = isOutgoingTxFinal;

            const isDebitTx = isDebitTxFinal;

            const outgoingFinal = isDebitTx;

            const isSentFinal = outgoingFinal;

            const isDebitTransaction = outgoingFinal;

            const isDebitUI = isDebitTransaction;

            const counterParty = isDebitUI
              ? txn.toUserId
              : txn.fromUserId;

            return (
              <div
                key={txn._id}
                className="bg-white rounded-2xl p-5 shadow-lg
                hover:shadow-2xl transition flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {counterParty?.firstName} {counterParty?.lastName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(txn.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      isDebitUI ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isDebitUI ? "-" : "+"}₹{(txn.amount / 100).toLocaleString()}
                  </p>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      txn.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Transactions;
