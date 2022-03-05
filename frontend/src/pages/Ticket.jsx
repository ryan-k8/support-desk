import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket, reset } from "../features/ticket/ticketSlice";
import { useParams, useNavigate } from "react-router-dom";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
  }, [dispatch, isError, message, getTicket]);

  const onTicketClosed = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Close");
    navigate("/tickets");
  };

  if (isError) {
    <h3>Something Went Wrong</h3>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted : {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>

          {ticket.status !== "closed" && (
            <button
              onClick={onTicketClosed}
              className="btn btn-block btn-danger"
            >
              Close
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
