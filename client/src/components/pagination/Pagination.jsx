import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const getPageNumbers = () => {
    const maxVisiblePages = 4;
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      // Si hay menos páginas que las visibles, mostramos todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Si hay más páginas, calculamos cuántas páginas mostrar antes y después de la actual
      const halfMaxVisible = Math.floor(maxVisiblePages / 2);
      let startPage = currentPage - halfMaxVisible;
      let endPage = currentPage + halfMaxVisible;

      // Ajustamos el rango de páginas si nos acercamos al inicio o final
      if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (endPage > totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      }

      // Generamos la lista de números de página a mostrar
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={styles.first}
      >
        <span className={styles.buttonTop}>First</span>
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={currentPage === pageNumber ? styles.active : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          <span className={styles.buttonTop}>{pageNumber}</span>
        </button>
      ))}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={styles.first}
      >
        <span className={styles.buttonTop}>Last</span>
      </button>
    </div>
  );
};

export default Pagination;
