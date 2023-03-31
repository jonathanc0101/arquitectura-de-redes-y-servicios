#include <stdio.h>
#include <stdlib.h>
#include <mpi.h>

#define VECTOR_SIZE 10

int main(int argc, char** argv) {
    int my_rank, size, i;
    double scalar = 2;
    double vector[VECTOR_SIZE];
    double result[VECTOR_SIZE];

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if(VECTOR_SIZE < size){
        if(my_rank == 0){
            perror("\nWe have more processes than the size of the array, aborting\n");
        }
        exit(EXIT_FAILURE);
    }

    // Initialize the vector
    for (i = 0; i < VECTOR_SIZE; i++) {
        vector[i] = i + 1;
    }

    // Divide the vector into equal-sized chunks for each process
    int chunk_size = VECTOR_SIZE / size;
    // Except for the last chunk, if it happens to be 0
    int last_chunk_size = VECTOR_SIZE - chunk_size * size;

    double local_vector[chunk_size];
    double local_result[chunk_size];


    MPI_Scatter(vector, chunk_size, MPI_DOUBLE, local_vector, chunk_size, MPI_DOUBLE, 0, MPI_COMM_WORLD);

    // Multiply the local vector by the scalar
    for (i = 0; i < chunk_size; i++) {
        local_result[i] = scalar * local_vector[i];
    }

    // Gather the results from each process
    MPI_Gather(local_result, chunk_size, MPI_DOUBLE, result, chunk_size, MPI_DOUBLE, 0, MPI_COMM_WORLD);

    // Print the results from process 0
    if (my_rank == 0) {

        if(last_chunk_size > 0){
            //we still have some work to do
            for (i = VECTOR_SIZE - last_chunk_size - 1; i < VECTOR_SIZE; i++)
            {
                result[i] = vector[i] * scalar;
            }
            
        }

        printf("Original vector:\n");
        for (i = 0; i < VECTOR_SIZE; i++) {
            printf("%f ", vector[i]);
        }
        printf("\n");

        printf("Resulting vector:\n");
        for (i = 0; i < VECTOR_SIZE; i++) {
            printf("%f ", result[i]);
        }
        printf("\n");
    }

    MPI_Finalize();
    return 0;
}