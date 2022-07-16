export interface LibroPage {
    content:          Libro[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Libro {
    idLibro:            number;
    titulo:             string;
    slug:               string;
    descripcion:        string;
    precio:             number;
    fechaCreacion:      Date;
    fechaActualizacion: Date | null;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
