set -e
  
host="$1"
shift

echo "###############################"
echo $1
echo $POSTGRES_PASSWORD
echo $host
echo $@
echo "################################"

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"
exec "$@"