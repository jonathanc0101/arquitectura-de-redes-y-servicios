#include <stdio.h>
#include <stdlib.h>
#include <mpi.h>

#define N 10

int main(int argc, char** argv) {
    int rank, size;
    int i, x[N], y[N], alpha = 2;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if (rank == 0) {
        // Inicializamos el vector x con valores aleatorios
        printf("Vector x:\n");
        for (i = 0; i < N; i++) {
            x[i] = rand() % 10;
            printf("%d ", x[i]);
        }
        printf("\n");

        // Enviamos el vector x a los otros procesos
        for (i = 1; i < size; i++) {
            MPI_Send(x, N, MPI_INT, i, 0, MPI_COMM_WORLD);
        }
    } else {
        // Recibimos el vector x del proceso 0
        MPI_Recv(x, N, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    }

    // Cada proceso multiplica su parte del vector por el escalar
    for (i = rank * (N / size); i < (rank + 1) * (N / size); i++) {
        y[i] = alpha * x[i];
    }

    // Recopilamos los resultados en el proceso 0
    if (rank == 0) {
        for (i = 1; i < size; i++) {
            MPI_Recv(&y[i * (N / size)], N / size, MPI_INT, i, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        }

        // Mostramos el resultado final
        printf("Vector y = %d * x:\n", alpha);
        for (i = 0; i < N; i++) {
            printf("%d ", y[i]);
        }
        printf("\n");
    } else {
        MPI_Send(y + rank * (N / size), N / size, MPI_INT, 0, 0, MPI_COMM_WORLD);
    }

    MPI_Finalize();
    return 0;
}