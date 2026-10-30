function TablaPaginacion({ pagina, setPagina, maximo }) {
    const nextPage = () => setPagina(pagina + 1);
    const prevPage = () => setPagina(pagina - 1);

    // Muestra máximo 5 números alrededor de la página actual
    const rango = 2; // cuántos números mostrar a cada lado
    let inicio = Math.max(1, pagina - rango);
    let fin = Math.min(maximo, pagina + rango);

    const numerosDePagina = [];
    for (let i = inicio; i <= fin; i++) {
        numerosDePagina.push(i);
    }

    return (
        <div className="container-pag">
            {pagina !== 1 && (
                <button className="btn-pag" onClick={prevPage}>Anterior</button>
            )}

            <div className="numeros-pagina">
                {inicio > 1 && (
                    <>
                        <button className="btn-numero" onClick={() => setPagina(1)}>1</button>
                        {inicio > 2 && <span className="puntos">...</span>}
                    </>
                )}

                {numerosDePagina.map((numero) => (
                    <button
                        key={numero}
                        className={`btn-numero ${numero === pagina ? 'activo' : ''}`}
                        onClick={() => setPagina(numero)}
                    >
                        {numero}
                    </button>
                ))}

                {fin < maximo && (
                    <>
                        {fin < maximo - 1 && <span className="puntos">...</span>}
                        <button className="btn-numero" onClick={() => setPagina(maximo)}>{maximo}</button>
                    </>
                )}
            </div>

            {pagina !== maximo && (
                <button className="btn-pag" onClick={nextPage}>Siguiente</button>
            )}
        </div>
    );
}

export default TablaPaginacion;